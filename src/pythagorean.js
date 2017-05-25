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

function primitivePythagoreanTripplesUnder(perimeter,cb) {
  var sum = (array) => array.reduce((a,b) => a+b);
  // primitive tripple if m>n>0, m and n are coPrime and of opposite parity
  function generateTripple(m,n) {
    var m2 = Math.pow(m,2);
    var n2 = Math.pow(n,2);
    var a = m2 - n2;
    var b = 2 * m * n;
    var c = m2 + n2;
    return [a,b,c]
  }

  // all values m will be coprime with 1
  var m = 2;
  var n = 1;
  var result = generateTripple(m,n)
  while (sum(result) < perimeter) {
    cb(result);
    result = (generateTripple(m += 2,n));
  }

  // m even, n odd (and greater than 1)
  var m = 4;
  while (sum(generateTripple(m,3)) < perimeter) {
    var n = 3;
    var result = generateTripple(m,n);
    while (n < m && sum(generateTripple(m,n)) < perimeter) {
      if (relativelyPrime(m,n)) {
        cb(result);
      }
      result = generateTripple(m, n+=2);
    }
    m += 2
  }

  // m odd, n even
  var m = 3;
  while (sum(generateTripple(m,2)) < perimeter) {
    var n = 2;
    var result = generateTripple(m,n);
    while (n < m && sum(generateTripple(m,n)) < perimeter) {
      if (relativelyPrime(m,n)) {
        cb(result);
      }
      result = generateTripple(m,n+=2)
    }
    m += 2;
  }
}


// note: perimeter here is not inclusive
function pythagoreanTripplesUnder(perimeter,cb) {
  var sum = (array) => array.reduce((a,b) => a+b);
  var scale = (factor) => (val) => val * factor;

  primitivePythagoreanTripplesUnder(perimeter, (tripple) => {
    var p = sum(tripple);
    var divisor = Math.floor(perimeter / p);
    for (var factor = 1; factor <= divisor; factor ++) {
      cb(tripple.map(scale(factor)));
    }
  })
}