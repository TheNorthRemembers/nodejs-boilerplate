#!/usr/bin/env node
/* @flow */
/* eslint-disable strict */

"use strict";

const { STACK_STRIP_NODE_MODULES } = process.env;

const program = require("commander");
const path = require("path");
const d = require("distraught");

d.init({
  pugOptions: {
    basedir: path.join(__dirname, "server/web/views"),
  },
  captureUncaught: true,
  captureUnhandled: true,
  ignoredStackTraceLines: STACK_STRIP_NODE_MODULES
    ? [
        "node_modules",
        "events.js",
        "_stream_readable.js",
        "net.js",
        "child_process.js",
        "next_tick.js",
        "timers.js",
        "module.js",
        "domain.js",
        "fs.js",
        "bootstrap_node.js",
        "runner.js",
      ]
    : [],
  // pathToServerErrorTemplate: "pages/errors/internal-server-error",
});

program
  .command("web")
  .description("start a web server")
  .action(() => {
    return require("./web").startWebServer();
  });

program
  .command("workers")
  .description("start a worker server")
  .action(() => {
    return require("./workers").startWorkerServer();
  });

program
  .command("cron")
  .description("start a cron server")
  .action(() => {
    return require("./crons").startCronServer();
  });

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(1);
}
