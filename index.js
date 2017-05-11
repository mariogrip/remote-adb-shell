#!/usr/bin/node
"use strict";

const Server = require("./src/server");
const Client = require("./src/client");
const cli = require("commander");
const version = require("./package.json").version;

cli
  .version(version)
  .usage('[options] <host> (default host: localhost)')
  .option('-s, --server', 'Server mode')
  .option('-p, --port <port>', 'Port (default: 9999)')
  .parse(process.argv);

if (cli.server)
  new Server(cli.args[0], cli.port);
else
  new Client(cli.args[0], cli.port);
