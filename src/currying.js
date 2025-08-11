//Currying is the process of transforming a function that takes multiple arguments into a sequence of functions, each taking one or more arguments (strict currying = one argument per call, loose currying = multiple allowed). The function only executes and returns a result once all expected arguments have been provided.
/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */

// Implemention 1
function curry(fn) {
  return function(...args) {
    if (fn.length <= args.length) {
      return fn.call(this, ...args)
    }

    const boundFn = fn.bind(this, ...args)
    return curry(boundFn)
  }
}

//Implementation 2
function curry(fn) {
  return function curried(...args) {
    // if number of arguments match
    if (args.length >= fn.length) {
      return fn.call(this, ...args)
    } 
    // just return a bounded curried() with args pre-filled
    return curried.bind(this, ...args)
  }
}

//Implementation 3
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.call(this, ...args)
        }

        return function(...missingArgs) {
            return curried.call(this, ...args, ...missingArgs)
        }
    }
}

const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(1)(2, 3) // '1_2_3'
curriedJoin(1, 2)(3) // '1_2_3'
curriedJoin(1, 2, 3, 4) // '1_2_3'