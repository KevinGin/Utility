module.exports = {primesTo, relativelyPrime, squareProducts}


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





