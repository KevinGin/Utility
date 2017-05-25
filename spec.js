const chai = require('chai'); 
const expect = require('chai').expect;


const {choose, combinations} = require('./src/combinatorics.js');
const {weight, occurrenceMap} = require('./src/strings.js');
const {primesTo, relativelyPrime, squareProducts} = require('./src/primes.js');


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
  const _combinations = Symbol();
  Array.prototype._combinations = function(...args) {
    combinations.apply(null,[this, ...args])
  }

  it ('method call should give correct number of combinations', function() {
    var a = ['rock','paper','scissors','candy'];
    var callbackCalled = false;
    for (var k = 0; k <= 5; k ++) {
      b = [];
      a._combinations(k, (combination) => {
        callbackCalled = true;
        b.push(combination)
      });
      expect(b.length).to.equal(choose(a.length,k));
      b.forEach(combination => expect(combination.length).to.equal(k));
    }
    expect(callbackCalled).to.equal(true);
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

describe('Primes', function() {
  it ('sieve should return all primes below n', function () {
    var results = primesTo(11);
    var primes = [2,3,5,7];
    expect(results.length).to.equal(4);
    primes.forEach((v,i) => {
      expect(v).to.equal(primes[i]);
    })
  }) 
  it ('should correctly determine whether distinct pos ints are relatively prime', function() {
    for (var i = 1; i < 5; i++) {
      expect(relativelyPrime(i,5)).to.equal(true);
    }
    for (var i = 2; i <= 20; i+=2) {
      expect(relativelyPrime(i,20)).to.equal(false);
    }
    expect(relativelyPrime(10,3)).to.equal(true);
    expect(relativelyPrime(9,3)).to.equal(false);
  })
  it ('should find all pairs of ints < n that have square products', function() {
    var resultString = '';
    var squareProductString = '14281949';
    squareProducts(10,(a,b) => {
      resultString += a;
      resultString += b;
    });
    expect(resultString).to.equal(squareProductString);
  })
})



