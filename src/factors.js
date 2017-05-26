module.exports = {primeFactors, allFactors, countFactors}

// cb(prime,exponent)
function primeFactors(n,cb) {
  if (n <= 1) return;
  var count = 0;
  while (n % 2 === 0) {
    count ++;
    n /= 2;
  }
  if (count > 0) {
    cb(2,count);
  }
  var factor = 3;
  while (Math.pow(factor,2) <= n) {
    count = 0;
    while (n % factor === 0) {
      count ++;
      n /= factor;
    }
    if (count > 0) {
      cb(factor,count);
    }
    factor += 2;
  }
  if (n !== 1) {
    cb(n,1);
  }
}


function allFactors(n,cb) {
  // KG: perhaps refactor the helper function to use a Queue, rather than recursion.
  function helper(result,depth) {
    if (depth === factors.length) {
      cb(result)
    } else {
      var [val,power] = factors[depth];
      for (var i = 0; i <= power; i ++) {
        helper(result * Math.pow(val,i), depth+1);
      }
    }
  }

  var factors = [];
  primeFactors(n, function(val,power) {
    factors.push([val,power]);
  })
  helper(1,0)
}


function countFactors(n) {
  if (n <= 2) {
    return n;
  }
  var results = 1;
  primeFactors(n, function(val,power) {
    results *= (power + 1);
  })
  return results;
}



// countFactorsAlt should not be used, but I'm including it below for the sake of comparison.
  // Runtime: In generally is slower than countFactors, but is slightly faster when n is randomly selected from from 0 < n < 5000.
  // Runtime: Even then, the performance benefits over countFactors is limited, and would really only show up if calling ~ 10^5ish times.
  // Runtime: And if you really needed to call that many times, it would be better to cache all possible results where 0 < n < 5000.
  // Runtime: Note that countFactorsAlt becomes MUCH slower for larger numbers, sometimes over 10x slower than countFactors.
// To compare, uncomment some of the code below.
function countFactorsAlt(n) {
  if (n <= 2) {
    return n;
  }
  var results = 0;
  for (var i = 1; i <= Math.sqrt(n); i += 1) {
    if (n % i === 0) {
      results += 2;
    }
  }
  if (Math.sqrt(n) % 1 === 0) {
    results --;
  }
  return results;
}




//  ******
//  Uncomment to compare countFactors with countFactorsAlt
//  ******

// var runTest = require('./debugging').compare.returnsArrayOfInts.bind(null,countFactors,countFactorsAlt);

// // Generates t cases of integer n, where 0 <= n < limit
// var testCases = (t,limit) => testCases1 = new Array(t).fill(0).map(() => Math.floor(Math.random() * limit)) 

// var t1 = testCases(Math.pow(10,5), Math.pow(10,8));  // countFactors 10x faster
// var t2 = testCases(Math.pow(10,6), 5 * Math.pow(10,3)); // about the same
// var t3 = testCases(Math.pow(10,6), Math.pow(10,2));  // countFactorsAlt 1.5x faster

// // Runs each test
// new Array(t1,t2,t3).forEach(runTest);












