module.exports.compare = {returnsArrayOfInts}


function returnsArrayOfInts(fn1,fn2,testCases) {
  function sameArrayOfInts(a,b) {
    if (a.length !== b.length) {
      throw 'Arrays of different lengths'
    } else {
      for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          console.log('difference found with test case: ', testCases[i])
          console.log('fn1 returned: ', a[i])
          console.log('fn2 returned: ', b[i])
          throw 'Functions yielded different results'
        }
      }
    }
  } 

  console.log('running ' + testCases.length + ' test cases...')


  var a = new Date();
  var result1 = testCases.map(fn1)
  var b = new Date();
  var result2 = testCases.map(fn2)
  var c = new Date();
  
  sameArrayOfInts(result1,result2)  
  console.log('Same results');
  console.log('fn1: ' + (b-a) + 'ms')
  console.log('fn2: ' + (c-b) + 'ms')
}


