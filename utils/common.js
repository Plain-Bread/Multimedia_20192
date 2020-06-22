function array(from, to) {
  return Array.from(Array(to - from + 1), (_, i) => i + from);
}

module.exports = { array };
