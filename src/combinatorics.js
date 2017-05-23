module.exports = {
  combinations: combinations,
  _combinations: _combinations,
  choose: choose
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