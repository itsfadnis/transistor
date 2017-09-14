#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var Transistor = require('./src/transistor');
var env = require('dotenv').config({
  path: process.cwd() + '/.transistor'
});

program
.usage('[action] [thing] [resource] [options]')
.version('1.0.0')
.option('-p, --path [path]', 'base path')
.parse(process.argv);

var basePath = program.path || '.';

if (env.parsed && env.parsed.PATH) {
  basePath = env.parsed.PATH;
}

Transistor.new({
  operation: program.args[0],
  thing: program.args[1],
  resource: program.args[2],
  path: path.resolve(basePath)
}).perform();
