# INSTALLATION

``npm i bird.db``
or
``yarn add bird.db``

---

# HOW TO USE MODULE

````javascript
const DataBase = require('bird.db');
const db = new DataBase('database.json'); // file name
````

# METHODS
``get, set, has, push, removeArray, getAll, delete, deleteAll, add, subtract, type``

---

# HOW TO USE METHODS

#### Example JSON:

```json
{
  "test": "123",
  "array": [
    "val",
    "val2",
    "val3"
  ],
  "object": {
    "name": "Yusuf",
    "age": 16
  },
  "all": {
    "names": ["Yusuf", "Enes", "Abdulrezzak"]
  },
  "count": 15,
  "active": false
}
```

#### get
```javascript
db.get('test'); // Output: "123"
// or
db.get('object', 'name'); // Output: "Yusuf"
```

#### set
```javascript
db.set('lang', 'en'); // {"lang": "en"}
// or
db.set('obj', {age: 11, dead: false}); // {"obj": {age: 11, dead: false}}
// or
db.set('arr', ['val', 'val2']); // {"arr": ["val", "val2"]}
```

#### has
```javascript
db.has('test1'); // false
// or
db.has('object', 'name'); // true
```

#### push
```javascript
db.push('newArr', 'value'); // {"newArr": ["value"]}
// or
db.push('newArray', 'Yusuf', 'names'); // {"newArray": {"names": ["Yusuf"]}}
// or
db.push('test', 'test2'); // Before: {"test": "123"}, After: {"test": ["123", "test2"]}
```

#### removeArray
```javascript
db.removeArray('array', 'val2'); // {"array": ["val", "val3"]}
// or
db.removeArray('all', 'Abdulrezzak', 'names'); // {"all": {"names": ["Yusuf", "Enes"]}}
```

##### getAll
```javascript
db.getAll();
```

```json
{
  "test": "123",
  "array": [
    "val",
    "val2",
    "val3"
  ],
  "object": {
    "name": "Yusuf",
    "age": 16
  },
  "all": {
    "names": [
      "Yusuf",
      "Enes",
      "Abdulrezzak"
    ]
  },
  "count": 15,
  "active": false
}
```

#### delete
```javascript
db.delete('test'); // * deleted *
```

#### deleteAll()
```javascript
db.deleteAll(); // {}
```

#### add
```javascript
db.add('add', 1); // {"add": 1}
// or
db.add('count', 1); // {"count": 16}
// or
db.add('object', 10, 'age'); // {"object": {"name": "Yusuf", "age": 26}}
```

#### subtract
```javascript
db.subtract('count', 1); // {"count": 14}
// or
db.subtract('object', 10, 'age'); // {"object": {"name": "Yusuf", "age": 6}}
```

#### type
```javascript
db.type('test'); // string
// or
db.type('object'); // object
// or
db.type('count'); // number
// or
db.type('active'); // boolean
```

#### NOTE
###### Important updates for this package coming soon.
