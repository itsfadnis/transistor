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

// Validate operation
var operation = program.args[0];
if (Transistor.OPERATIONS.indexOf(operation) === -1) {
  throw new Error('Invalid operation: ' + this.operation);
}

// Validate thing
var thing = program.args[1];
if (Transistor.THINGS.indexOf(thing) === -1) {
  throw new Error('Invalid thing: ' + this.thing);
}

// Validate resource
var resource = program.args[2]
if (resource === undefined) {
  throw new Error(
    'Missing resource: transistor ' + operation + ' ' + thing + ' [resource]'
  );
}

Transistor.new({
  operation: operation,
  thing: thing,
  resource: resource,
  path: path.resolve(basePath)
}).perform();
