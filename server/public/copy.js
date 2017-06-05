var obj1 = {
  name: 'obj1',
  inner: {
    name: 'inner'
  },
  arr: [
    {name: 'arr', obj: {name: 'obj'}}
  ]
}


var obj2 = copy(obj1)
var obj3 = clone(obj1)

obj1.arr[0].name = 'changed'


console.log(obj1.arr[0].name)
console.log(obj2.arr[0].name)
console.log(obj3.arr[0].name)

function clone(variate) {
  if (typeof variate === 'string' ||
      typeof variate === 'number' ||
      typeof variate === 'boolean'){
    return variate
  } else if (Array.isArray(variate)) {
    return cloneArr(variate)
  } else if (typeof variate === 'object') {
    return cloneObj(variate)
  }

  function cloneArr(arr, result) {
    result = typeof result !== 'undefined' ? result : []
    arr.forEach(item => {
      if (typeof item !== 'object') {
        result.push(item)
      } else if (Array.isArray(item)) {
        result.push(cloneArr(item))
      } else {
        result.push(cloneObj(item))
      }
    })
    return result
  }
  function cloneObj(obj, result) {
    result = typeof result !== 'undefined' ? result : {}
    for (var key in obj) {
      if (typeof obj[key] !== 'object') {
        result[key] = obj[key]
      } else if (Array.isArray(obj[key])) {
        result[key] = cloneArr(obj[key])
      } else {
        result[key] = cloneObj(obj[key])
      }
    }
    return result
  }
}

function copy(obj) {
  var result = {}
  for (var k in obj) {
    result[k] = obj[k]
  }
  return result
}


