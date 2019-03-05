ifeq ($(OS),Windows_NT)
	NF = bash node_modules/.bin/nf
	MARINER = bash node_modules/.bin/mariner
else
	NF = node_modules/.bin/nf
	MARINER = node_modules/.bin/mariner
endif

.PHONY: web lint crons workers ui all test migration migrate rollback script

lint:
	npm run lint

web:
	npm run web

dev:
	yarn concurrently 'yarn run web' 'yarn run build:webpack:dev'

crons:
	npm run crons

workers:
	npm run workers

test:
	npm run test

script:
	npm run script

migration:
	@while [ -z "$$MIGRATION_NAME" ]; do \
		read -r -p "Enter Migration Name: " MIGRATION_NAME; \
	done ; \
	${NF} run $(MARINER) create "$$MIGRATION_NAME"

migrate:
	npm run migrate

rollback:
	npm run rollback

docker-up:
	${NF} run make actually-docker-up

actually-docker-up:
	docker-compose up -d

