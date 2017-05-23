module.exports = {
	weight: weight,
  occurrenceMap: occurrenceMap
}

// returns lowercase 'weight' of lowercase character. Useful for creating arrays, where indices proxy for characters.
// weight(a) => 0; weight(b) => 1, etc.
function weight(char) {
  return char.charCodeAt(0)-97;
}

// returns an array, where indices correspond to ascii values, and values correspond to number of instances
function occurrenceMap(asciiString) {
  var results = new Array(128);
  for (var i = 0; i < 128; i++) {
    results[asciiString.charCodeAt(i)] = (results[asciiString.charCodeAt(i)] || 0) + 1;
  }
  return results;
}