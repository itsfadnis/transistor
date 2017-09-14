var fs = require('fs');
var snakecase = require('./helpers/dashcase-to-snakecase');
var camelcase = require('./helpers/dashcase-to-camelcase');
var capitalize = require('./helpers/capitalize');

function TemplateGenerator(thing, resource) {
  this.thing = thing;
  this.resource = resource;
}

TemplateGenerator.new = function(thing, resource) {
  return new this(thing, resource);
};

TemplateGenerator.prototype.generateTemplate = function() {
  switch (this.thing) {
  case 'constants':
    return this.generateConstantsTemplate();
  case 'actions':
    return this.generateActionsTemplate();
  case 'reducer':
    return this.generateReducerTemplate();
  default:
    throw new Error('Invalid thing: ' + this.thing);
  }
};

TemplateGenerator.prototype.generateConstantsTemplate = function() {
  var template = fs.readFileSync(__dirname + '/templates/constants', 'utf8');
  var constant = snakecase(this.resource).toUpperCase();

  return template.replace(/\*/g, constant);
};

TemplateGenerator.prototype.generateActionsTemplate = function() {
  var template = fs.readFileSync(__dirname + '/templates/actions', 'utf8');
  var action = capitalize(camelcase(this.resource));

  return template.replace(/@/, this.resource).replace(/\*/g, action);
};

TemplateGenerator.prototype.generateReducerTemplate = function() {
  var template = fs.readFileSync(__dirname + '/templates/reducer', 'utf8');
  var constant = snakecase(this.resource).toUpperCase();

  return template.replace(/@/, this.resource).replace(/\*/g, constant)
};

module.exports = TemplateGenerator;
