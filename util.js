
// applies callback to each k-sized combination in array
module.exports.combinations = function(array, k, callback, results = [], lower = 0) {
  for (var i = lower; i < array.length; i ++) {
    var item = array[i];
    if (k === 1) {
      callback([...results,item])
    } else {
      module.exports.combinations(array, k-1, callback, [...results,item],i+1);
    }
  }
}

// combinations, called as method
module.exports._combinations = function(k, callback, results = [], lower = 0) {
  for (var i = lower; i < this.length; i ++) {
    var item = this[i];
    if (k === 1) {
      callback([...results,item])
    } else {
      this.combinations(k-1, callback, [...results,item],i+1);
    }
  }
}

// choose(10,2) => returns 45
module.exports.choose = function(n,k) {
  var productRange = (a,b,result=1) => a === b ? result*a : productRange(a+1,b,result*a); 
  if (n <= 0  || k <= 0 || n < k) return 0;
  return productRange(n-k+1,n) / productRange(1,k);
}