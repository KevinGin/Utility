module.exports = {xRange};


// DEVELOPER NOTES:
  // For xMap, we don't want to actually map out the array (since that would defeat purpose with xRange)
  // So right now, I'm keeping a "maps" property, which gets cleared after reduce or forEach.
  // Perhaps I could add in an xReduce which doesn't clear things out... but that might make things more complicated than they need to be.


// To Do:
	// ** filter: take in a callback? or return an array?
			// If not, how to interact with maps? ([perhaps keep track of filtered indices... although efficiency would take a hit...])
			// current plan, take in a callback, but if toArray(predicate)... then it will filter.
			// maybe call this toArrayWhere...


// TO DO:
	// ** while: something that will work in place of forEach on infinite series.
			// perhaps even do a filterWhile(predicate1,predicate2);



// Edge case increment === 0...
// Note that will not make infinite series on forEach/reduce
//  (since increment will be negative or zero)
function xRange(start,end,increment) {
	if (end === undefined) {
		this.start = 0;
		this.end = start;
		this.increment = 1;
	} else {
		this.start = start;
		this.end = end;
		this.increment = increment === undefined ? 1 : increment;
	}

	this.current = this.start;
	this.currentIndex = 0;

	this.next = function() {
		var toReturn = this.current;
		for (var i = 0; i < this.maps.length; i++) {
			toReturn = this.maps[i](toReturn,this.currentIndex);
		}
		this.currentIndex ++;
		this.current += this.increment;
		return toReturn;
	}

	this.length = Math.ceil((this.end - this.start) / this.increment);
	this.maps = [];

}


xRange.prototype.reduce = function(cb,acc) {
	this.current = this.start;
	var i = 0;
	if (acc === undefined) {
		i ++;
		acc = this.next();
	}
	while (i < this.length) {
		acc = cb(acc,this.next());
		i++;
	}
	this.maps = [];
	return acc;
}


xRange.prototype.forEach = function(cb) {
	this.current = this.start;
	this.currentIndex = 0;
	for (var i = 0; i < this.length; i++) {
		cb(this.next(),i);
	}
	this.maps = [];
}

// Adds to temporary list of maps that will be cleared after call of reduce or forEach
xRange.prototype.xMap = function(cb) {
	this.maps.push(cb);
	return this;
}

xRange.prototype.show = function(cb) {
	var toShow = new Array(this.length);
	this.forEach((v,i) => {
		toShow[i] = v;
	})
	console.log(toShow);
	return this;
}


var print = (v) => console.log(v);

var r = new xRange(6);
// console.log(r)

// r.xMap(val => val*val).xMap(val => val+1).show();

// r.xMap((val,index) => {
// 	console.log(val,index);
// 	return val;
// }).xMap((val,index) => {
// 	console.log(val,index);
// 	return val;
// }).show();


r.xMap((val,i) => i * i).xMap(val => val+1).show();






// r.xMap((val,i) => val).show();


// r.xMap((val,i) => val + 10).xMap((val,i) => val * i).show()


// console.log(r);

// console.log(r.next());
// console.log(r.next());
// console.log(r.next());

// var sum = (a,b) => a+b;

// r.forEach((v) => console.log(v))
// var result = r.reduce(sum,0);
// console.log('sum',result)




// var add = (a,b) => a+b;



// // var r = new xRange(6,-1,-20);
// var r = new xRange(0,6,1);
// // console.log(r);

// // r.forEach((v) => console.log(v))

// var s = r.reduce(add);

// console.log(s);








// var n = Math.pow(10,7);


// var m1 = new Array(n);
// var m2 = new Array(n);

// var sample1 = (v) => m1[v] = (v * 2 + 3);
// var sample2 = (v) => m2[v] = (v * 2 + 3);


// var add = (a,b) => a+b;


// var n = Math.pow(10,7);
// var r = new xRange(n);

// var B = new Date();

// var a = r.forEach(sample1)

// var C = new Date();

// var b = r.forEachAlt(sample2)

// var D = new Date();



// var B = new Date();

// var a = r.forEach(sample1)

// var C = new Date();

// var b = r.forEachAlt(sample2)

// var D = new Date();


// console.log((C-B) + 'ms');
// console.log((D-C) + 'ms');





