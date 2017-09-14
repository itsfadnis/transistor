var fs = require('fs');
var chalk = require('chalk');
var path = require('path');
var log = console.log;

function FileDestroyer(filePath) {
  this.filePath = filePath;
}

FileDestroyer.new = function(filePath) {
  return new this(filePath);
}

FileDestroyer.prototype.destroyFile = function() {
  fs.unlinkSync(this.filePath);
  log('  %s %s', chalk.red('remove'), path.relative(process.cwd(), this.filePath));
}

module.exports = FileDestroyer;
