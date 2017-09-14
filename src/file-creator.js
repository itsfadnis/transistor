var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var log = console.log;

function FileCreator(filePath, content, options) {
  this.filePath = filePath;
  this.content = content;
  this.options = options || {};
}

FileCreator.new = function(filePath, content, options) {
  return new this(filePath, content, options);
};

FileCreator.prototype.ensurePathExistence = function(filePath) {
  var dirname = path.dirname(filePath);

  if (!fs.existsSync(dirname)) {
    this.ensurePathExistence(dirname);
    fs.mkdirSync(dirname);
  }
}

FileCreator.prototype.createFile = function() {
  if (fs.existsSync(this.filePath)) {
    return log('  %s %s', chalk.yellow('exists'), path.relative(process.cwd(), this.filePath));
  }

  this.ensurePathExistence(this.filePath);

  fs.writeFileSync(this.filePath, this.content, this.options);
  log('  %s %s', chalk.green('create'), path.relative(process.cwd(), this.filePath));
}

module.exports = FileCreator;
