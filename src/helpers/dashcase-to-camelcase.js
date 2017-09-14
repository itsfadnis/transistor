module.exports = function(string) {
  return string.toLowerCase().replace(/-(.)/g, function(match, group) {
    return group.toUpperCase();
  });
};
