var fs = require('fs');
var path = require('path');
var FileCreator = require('./file-creator');
var FileDestroyer = require('./file-destroyer');
var TemplateGenerator = require('./template-generator');

function Transistor(stuff) {
  this.operation = stuff.operation;
  this.thing = stuff.thing;
  this.resource = stuff.resource;
  this.path = stuff.path;
}

Transistor.new = function(stuff) {
  return new this(stuff);
};

Transistor.THINGS = [
  'constants',
  'actions',
  'reducer',
  'blueprint'
];

Transistor.OPERATIONS = [
  'g',
  'd'
];

Transistor.prototype.validateOperation = function() {
  if (this.constructor.OPERATIONS.indexOf(this.operation) === -1) {
    throw new Error('Invalid operation: ' + this.operation);
  }
}

Transistor.prototype.validateThing = function() {
  if (this.constructor.THINGS.indexOf(this.thing) === -1) {
    throw new Error('Invalid thing: ' + this.thing);
  }
}

Transistor.prototype.validateResource = function() {
  if (this.resource === undefined) {
    throw new Error(
      'Missing resource: transistor ' + this.operation + ' ' + this.thing + ' [resource]'
    );
  }
}

Transistor.prototype.validate = function() {
  this.validateOperation();
  this.validateThing();
  this.validateResource();
};

Transistor.prototype.perform = function() {
  this.validate();

  this[this.operation].call(this);
};

Transistor.prototype.pathToThing = function(thing) {
  switch (thing) {
  case 'constants':
  case 'actions':
    return this.path + '/' + thing;
  case 'reducer':
    return this.path + '/reducers';
  case 'blueprint':
    return this.path;
  default:
    throw new Error('Invalid thing: ' + thing);
  }
};

Transistor.prototype.generateBlueprint = function() {
  var self = this;

  ['constants', 'actions','reducer'].forEach(function(thing) {
    var filePath = self.pathToThing(thing) + '/' + self.resource + '.js';
    var content = TemplateGenerator.new(thing, self.resource).generateTemplate();

    FileCreator.new(filePath, content).createFile();
  });
};

Transistor.prototype.g = function() {
  console.log('installing %s', this.thing);

  if (this.thing === 'blueprint') {
    this.generateBlueprint();
  } else {
    var filePath = this.pathToThing(this.thing) + '/' + this.resource + '.js';
    var content = TemplateGenerator.new(this.thing, this.resource).generateTemplate();

    FileCreator.new(filePath, content).createFile();
  }
};

Transistor.prototype.destroyBlueprint = function() {
  var self = this;

  ['constants', 'actions', 'reducer'].forEach(function(thing) {
    var filePath = self.pathToThing(thing) + '/' + self.resource + '.js';

    FileDestroyer.new(filePath).destroyFile();
  });
}

Transistor.prototype.d = function() {
  console.log('uninstalling %s', this.thing);

  if (this.thing === 'blueprint') {
    this.destroyBlueprint();
  } else {
    var filePath = this.pathToThing(this.thing) + '/' + this.resource + '.js';

    FileDestroyer.new(filePath).destroyFile();
  }
}

module.exports = Transistor;
