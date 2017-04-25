const chai = require('chai'); 
const expect = require('chai').expect;

// var {choose, combinations, _combinations} = require('./util.js')

var {choose, combinations} = require('./util.js');


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
