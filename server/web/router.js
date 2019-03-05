/* @flow */
import path from "path";
import glob from "glob";
import { each } from "lodash";
import { httpServer } from "distraught";

const IS_DEV = process.env.NODE_ENV === "development";
const viewPath = path.join(`${IS_DEV ? "" : "dist/"}server/web/views`);
const server = httpServer({
  logFormat:
    ":method :req[host]:url :user-agent :status :response-time ms - :res[content-length]",
  publicPath: path.join(__dirname, "public"),
  viewPath,
  viewEngine: !IS_DEV ? "js" : null,
});
server.app.locals.basedir = server.app.get("views");
if (!IS_DEV) {
  server.app.engine("js", (filePath, options, callback) => {
    // $FlowIgnore
    const data = require(filePath)(options); // eslint-disable-line
    callback(null, data);
  });
}

// Apply any middleware here
// server.app.use("/", badRobotsMiddleware);

// Register Any auth strategies here
// registerAuthStrategies(server.passport);

// include all controllers
glob("server/web/controllers/**/*.js", (err, files) => {
  each(files, (file) => {
    // $FlowIgnore
    require(file).routes(server); // eslint-disable-line
  });
});

server.start();
