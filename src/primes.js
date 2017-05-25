module.exports = {primesTo, relativelyPrime, squareProducts, relativelyPrime}

// KG: TEST
// function isPrime(n) {
//   var lowerPrimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409];
//   if (n <= 410) {
//     return lowerPrimes.includes(n);
//   }
//   for (var i = 0; i < lowerPrimes.length; i++) {
//     if (n % i === 0) {
//       return false;
//     }
//   }
//   for (var i = 420; i < Math.sqrt(n) + 3, 6) {
//     if (n % (i-1) === 0) {
//       return false;
//     }
//     if (n % (i+1) === 0) {
//       return false;
//     }
//   }
//   return true;
// }


function relativelyPrime(n,m) {
  if (n % 2 === 0 && m % 2 === 0) {
    return false
  }
  for (var i = 3; i <= Math.min(n,m); i++) {
    if (n % i === 0 && m % i === 0) {
      return false
    }
  }
  return true;
}

// This is a very fast prime sieve -- I haven't found any faster in JS
function primesTo(n) {
  var primes = [];
  var array = new Array(n)
  for (var i = 2; i < n; i++) {
    if (!array[i]) {
      primes.push(i);
      for (var j = 2 * i; j < n; j += i) {
        array[j] = true;
      }
    }
  }
  return primes;
}

// Checks to see if n and m are relatively Prime
function relativelyPrime(n,m) {
  if (n % 2 === 0 && m % 2 === 0) {
    return false
  }
  for (var i = 3; i <= Math.min(n,m); i++) {
    if (n % i === 0 && m % i === 0) {
      return false
    }
  }
  return true;
}



// finds pairs of unique integers in range 1-n (inclusive) that multiply to a square number
// callback(a,b)
// note that if a * b == c^2, then there are two integers i, j, such that...
  // i^2 * j^2 * multiplier = c^2 * multiplier
function squareProducts(n, callback) {
  for (var i = 1; i * i < n; i++) {
    for (var j = i+1; j * j <= n; j++) {
      if (relativelyPrime(i,j)) {
        var lowerBase = Math.pow(i,2);
        var upperBase = Math.pow(j,2);
        var multiplier = 1;
        while (upperBase * multiplier <= n) {
          callback(lowerBase*multiplier, upperBase*multiplier);
          multiplier ++;
        }
      }
    }
  }
}



