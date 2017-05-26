module.exports = {mapMutate}

// map function, when you can throw away original array.
// much faster than ordinary map method
// also more memory efficient (which also means less time doing garbage colletion)
function mapMutate(arr,cb) {
	for (var i = 0; i < arr.length; i++) {
		arr[i] = cb(arr[i],i);
	}
	return arr;
}


// iterates through range quickly (so you don't need to write out for-loop)
function quickRange(n, cb) {
	var i = 0;
	while (i < n) {
		cb(i++);
	}
}