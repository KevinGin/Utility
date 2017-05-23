const chai = require('chai'); 
const expect = require('chai').expect;

// var {choose, combinations, _combinations} = require('./util.js')

var {choose, combinations} = require('./src/combinatorics.js');
var {weight, occurrenceMap} = require('./src/strings.js');


describe('Combinatorics', function() {
  
  it ('should correctly choose(n,k)', function() {
    expect(choose(5,1)).to.equal(5);
    expect(choose(5,2)).to.equal(10);
    expect(choose(5,3)).to.equal(10);
    expect(choose(5,4)).to.equal(5);
    expect(choose(5,5)).to.equal(1);
    expect(choose(4,1)).to.equal(4);
    expect(choose(4,2)).to.equal(6);
    expect(choose(4,3)).to.equal(4);
    expect(choose(4,4)).to.equal(1);
    [[0,0],[-1,4],[4,-1],[3,0],[0,3],[1,2]].forEach((pair) => {
      expect(choose.apply(this,pair)).to.equal(0);
    });
  })

  // modify prototype
  Array.prototype.combinations = function(...args) {
    combinations.apply(null,[this, ...args])
  }

  it ('method call should give correct number of combinations', function() {
    var a = ['rock','paper','scissors','candy'];
    for (var k = 0; k <= 5; k ++) {
      b = [];
      a.combinations(k, (combination) => b.push(combination));
      // expect(b.length).to.equal(choose(a.length,k));
      b.forEach(combination => expect(combination.length).to.equal(k));
    }
  })
})

describe('Strings', function() {
  it ('should correctly map weight of lowercase characters', function() {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet.split('').forEach((char,index) => {
      expect(weight(char)).to.equal(index);
    })
  })

  it('should correctly count occurrences', function() {
    var testString = 'zz aba. c1. aaaabaZ';
    var occurrences = occurrenceMap(testString);
    expect(occurrences[97]).to.equal(7);  // 7 occurrences of 'a'
    expect(occurrences[98]).to.equal(2);  // 2 occurrences of 'b'
    expect(occurrences[99]).to.equal(1);  // 1 occurrence of 'c'
    expect(occurrences[100]).to.equal(undefined); // occurences of 'd' left undefined (for easier traversal with forEach)
    expect(occurrences[122]).to.equal(2); // 2 occurrences of 'z'
    expect(occurrences[90]).to.equal(1); // 1 occurrence of 'Z'
    expect(occurrences[49]).to.equal(1); // 1 occurrence of '1'
    expect(occurrences[32]).to.equal(3); // 3 spaces
    expect(occurrences[46]).to.equal(2); // 2 occurrences of '.'
  })
})