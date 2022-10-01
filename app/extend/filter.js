module.exports = {
  split: (tags, sep = ',') => (tags ? tags.split(sep) : tags),
  getids: (arr, name) => arr.map(item => item),
};
