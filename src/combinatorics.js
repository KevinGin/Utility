module.exports = {
  combinations,
  _combinations,
  choose,
  nthPermutation
}

module.exports = {
  combinations: combinations,
  _combinations: _combinations,
  choose: choose,
  nthPermutation:
}

// applies callback to each k-sized combination in array
function combinations(array, k, callback, results = [], lower = 0) {
  for (var i = lower; i < array.length; i ++) {
    var item = array[i];
    if (k === 1) {
      callback([...results,item])
    } else {
      combinations(array, k-1, callback, [...results,item],i+1);
    }
  }
}


// combinations, called as method (after Array.prototype._combinations )
function _combinations(k, callback, results = [], lower = 0) {
  for (var i = lower; i < this.length; i ++) {
    var item = this[i];
    if (k === 1) {
      callback([...results,item])
    } else {
      this._combinations(k-1, callback, [...results,item],i+1);
    }
  }
}

// choose(10,2) => returns 45
function choose(n,k) {
  var productRange = (a,b,result=1) => a === b ? result*a : productRange(a+1,b,result*a); 
  if (n <= 0  || k <= 0 || n < k) return 0;
  return productRange(n-k+1,n) / productRange(1,k);
}

// facotial, 0! = 1
function factorial(n) {
  if (n > 18) console.log('WARNING: results exceed Number.MAX_SAFE_INTEGER')
  if (n <=1) return 1;
  var result = 1;
  for (var i = 1; i <= n; i++) {
    result *= i;
  }
  return result;

}


// finds nthPermutation, given current ordering
// if you want nthPermutaiton sorted lexographically, e.g., you want to call on lexographically sorted array
function nthPermutation(array,n) {
  function insertSwap(i,j) {
    var temp = array[i];
    array[i] = array[j];
    for (var index = i+1; index <= j; index++) {
      nextTemp = array[index];
      array[index] = temp;
      temp = nextTemp;
    }
  }

  var array = array.slice();  // copy array
  var len = array.length;
  if (n <= 0 || n > factorial(len)) {
    console.log('out of range -- no such permutation');
    return -1;
  }

  var remainder = n-1;  // minus 1, because first is when remainder = 0
  var index = 0;

  while (remainder > 0) {
    divisor = factorial(len-index-1);  // minus 1, because no permutations above factorial(length)
    var toSwap = index + Math.floor(remainder / divisor);
    insertSwap(index,toSwap);
    remainder = remainder % divisor;
    index ++;
  }
  return array;
}


// used, e.g., in finding nthPermutation: https://en.wikipedia.org/wiki/Factorial_number_system
function factorialRepresentation(n) {
  var str = ''
  var divisor = 1;
  // var quotient = Math.floor(n / divisor++);
  while (n > 0) {
    // str = (n % divisor).toString() + str;
    str = (n % divisor).toString() + str;

    n = Math.floor(n / divisor);
    divisor ++;
  }
  return str.split('').map(s => parseInt(s));
}



// Working on alternate nthPermutation that relies on factorialReprestation.
// Initial implementation wasn't faster, but perhaps still could optimize.
// function nthPermutationAlt(array,n) {
//   // console.log(array)
//   function insertSwap(a,b) {
//     // console.log('called')
//     var i = Math.min(a,b);
//     var j = Math.max(a,b);

//     var temp = array[i];
//     array[i] = array[j];
//     for (var index = i+1; index <= j; index++) {
//       // console.log('swapping!')
//       nextTemp = array[index];
//       array[index] = temp;
//       temp = nextTemp;
//     }
//   }

//   var fRep = factorialRepresentation(n-1);  // n-1 because we start counting at zero

//   var array = array.slice();  // copy array
//   var len = array.length;
//   if (n <= 0 || n > factorial(len)) {
//     console.log('out of range -- no such permutation');
//     return -1;
//   }

//   var startIndex = array.length - fRep.length
//   // console.log(fRep)
//   // console.log(array.length)
//   // console.log(array[startIndex])
//   for (var i = startIndex; i < array.length; i++) {
//     console.log('swapping: ', i, fRep[i-startIndex]+i)
//     insertSwap(i,fRep[i-startIndex]+i);
//     // console.log(array);
//   }

//   return array;
// }



function nthPermutation(array,n) {
  function insertSwap(i,j) {
    var temp = array[i];
    array[i] = array[j];
    for (var index = i+1; index <= j; index++) {
      nextTemp = array[index];
      array[index] = temp;
      temp = nextTemp;
    }
  }

  var array = array.slice();  // copy array
  var len = array.length;
  if (n <= 0 || n > factorial(len)) {
    console.log('out of range -- no such permutation');
    return -1;
  }

  var remainder = n-1;  // minus 1, because first is when remainder = 0
  var index = 0;

  while (remainder > 0) {
    divisor = factorial(len-index-1);  // minus 1, because no permutations above factorial(length)
    var toSwap = index + Math.floor(remainder / divisor);
    // console.log('swapping: ', index, toSwap)
    insertSwap(index,toSwap);
    remainder = remainder % divisor;
    index ++;
  }
  return array;
}