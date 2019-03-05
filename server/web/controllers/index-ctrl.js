// @flow

import { w } from "distraught";
import type { Req, Res } from "flow/types";

export function routes(server: Object) {
  server.app.get("/", w(indexHandler));
}

async function indexHandler(req: Req, res: Res) {
  return req.query.format === "json"
    ? res.send({ test: "this is a test" })
    : res.render("index");
}
