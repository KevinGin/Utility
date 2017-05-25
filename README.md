# util.js
Utility functions for programming challenges.

---

### Combinatorics

**combinations**  &nbsp; combinations(array,k, callback)
Applies callback to each k-length combination that from the array.

```javascript
var moves = ['rock','paper','scissors'];
combinations(a,2,console.log);  // console.logs ==>
// [ 'rock', 'paper' ]
// [ 'rock', 'scissors' ]
// [ 'paper', 'scissors' ]
```
Alternatively, use combinations as a method call:

```javascript
const {combinations} = require('./src/combinatorics.js');
const _combinations = Symbol();
Array.prototype._combinations = function(...args) {
  combinations.apply(null,[this, ...args])
}

['rock','paper','scissors']._combinations(console.log); // console.logs ==>
// [ 'rock', 'paper' ]
// [ 'rock', 'scissors' ]
// [ 'paper', 'scissors' ]
```

**choose**  &nbsp; choose(n,k)
Returns the binomial coefficient, "n choose k".

```javascript
choose(5,1) // returns 5
chooss(10,2) // returns 45
```