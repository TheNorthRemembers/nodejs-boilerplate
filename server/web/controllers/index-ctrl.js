import _ from "lodash";
import { w } from "distraught";
import fruits from "../fruits.json";

export function routes(server) {
  server.app.get("/api/fruits", w(fruitsHandler));
}

async function fruitsHandler(req, res) {
  const { query: filters } = req;
  return res.json(filterFruits(filters));
}

function filterFruits(filters) {
  return _.reduce(
    filters,
    (memo, value, filter) => {
      if (!value) {
        return memo;
      }
      if (filter === "in_season") {
        const in_season = value.toLowerCase() === "true" ? true : false;
        return _.filter(memo, (item) => item.in_season === in_season);
      }
      if (filter === "color") {
        return _.filter(memo, (item) => _.includes(item.colors, value));
      }
      if (filter === "name") {
        return _.filter(memo, (item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
      }
      return memo;
    },
    fruits
  );
}
