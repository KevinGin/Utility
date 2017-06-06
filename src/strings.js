module.exports = {weight, weightUpper,occurrenceMap}


// returns lowercase 'weight' of lowercase character. Useful for creating arrays, where indices proxy for characters.
// weight('a') => 1; weight('b') => 2, etc.
function weight(char) {
  return char.charCodeAt(0)-96;
}
// same but with uppercase. wordWeightUpper('A') => 1
function weightUpper(char) {
	return char.charCodeAt(0)-64;
}

// calculates weigth of entire lowercase word  ('ab') => 3
function wordWeight(char) {
	var sum = 0;
	for (var i = 0; i < str.length; i++) {
		sum += str.charCodeAt(i) - 96;
	}
	return sum;
}

// same but with upper ('AB') => 3
function wordWeightUpper(str) {
	var sum = 0;
	for (var i = 0; i < str.length; i++) {
		sum += str.charCodeAt(i) - 64;
	}
	return sum;
}

// returns an array, where indices correspond to ascii values, and values correspond to number of instances
function occurrenceMap(asciiString) {
  var results = new Array(128);
  for (var i = 0; i < 128; i++) {
    results[asciiString.charCodeAt(i)] = (results[asciiString.charCodeAt(i)] || 0) + 1;
  }
  return results;
}

// returns a boolean object, with letters as keys
function mapChars(string) {
  var results = {};
  for (var i = 0; i < string.length; i ++) {
    results[string[i]] = true;
  }
  return results;
}


// returns a boolean objct, indicating which letters occur in every word
// basically just a union function after converting to object
function occursInEvery(arrayOfWords) {
  function combine(acc,word) {
    var results = {};
    for (var i = 0; i < word.length; i++) {
      var char = word[i];
      if (acc[char]) {
        results[char] = true;
      }
    }
    return results;
  }
	return arrayOfWords.reduce(combine,mapChars(arrayOfWords[0]));
}




var arrayOfWords = ['abpc','apple'];

var result = occursInEvery(arrayOfWords);
console.log(result);


