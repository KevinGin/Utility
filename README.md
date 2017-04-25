# util.js
Utility functions for programming challenges.

---

### Combinatorics

**choose**  &nbsp; choose(n,k)
Returns the binomial coefficient, "n choose k".

```javascript
choose(5,1) // returns 5
chooss(10,2) // returns 45
```

**_combinations**  &nbsp; array.combinations(k, callback)
Applies callback to each k-length combination that from the array. For production code, consider using combinatios (without the underscore), rather than modifying Array.prototype. 

```javascript
Array.prototype.combinations = require('./util.js')._combinations;
['rock','paper','scissors'].combinations(2,console.log);  // console.logs ==>
// [ 'rock', 'paper' ]
// [ 'rock', 'scissors' ]
// [ 'paper', 'scissors' ]
```

**combinations**  &nbsp; combinations(array,k, callback)
Applies callback to each k-length combination that from the array.

```javascript
var moves = ['rock','paper','scissors'];
combinations(a,2,console.log);  // console.logs ==>
// [ 'rock', 'paper' ]
// [ 'rock', 'scissors' ]
// [ 'paper', 'scissors' ]
```