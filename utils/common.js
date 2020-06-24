function array(from, to) {
  return Array.from(Array(to - from + 1), (_, i) => i + from);
}

function replaceAll(string, find, replace) {
  return string.split(find).join(replace);
}

function replaceAllCharacters(string, characters, replace) {
  let output = string;
  for (const character of characters) {
    output = replaceAll(output, character, replace);
  }

  return output;
}

module.exports = { array, replaceAll, replaceAllCharacters };
