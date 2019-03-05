// @flow
declare var process: {
  // Note: this file tells Flowtype what env vars we expect to be populated
  env: {
    AMQP_URL: string,
    API_BASE: string,
    APP_NAME: string,
    BASE_URL: string,
    DATABASE_URL: string,
    SESSION_SECRET:string,
    HOST: string,
    KNEX_DEBUG: ?string,
    NODE_ENV: string,
    NODE_PATH: string,
    REDIS_URL: string,
    WORKER_DEBUG: string,
    STACK_STRIP_NODE_MODULES?: string,

  },
  hrtime: Function,
  argv: Array<string>,
  cwd: Function,
  on: Function,
  exit: Function,
  pid: string,
};
