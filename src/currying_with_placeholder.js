function curry(fn) {
  return function curried(...args) {
    let x = args.slice(0, fn.length)
    if (args.length >= fn.length && !x.includes(curry.placeholder)) {
      return fn.apply(this, args);
    }

    return function (...missingArgs) {
      let current = [...args];
      let newArgs = [...missingArgs];
      let finalArgs = [];
      let i = 0, j = 0;

      while (i < current.length && j < newArgs.length) {
        if (current[i] === curry.placeholder && newArgs[j] !== curry.placeholder) {
          finalArgs.push(newArgs[j]);
          i++; j++;
        } else if (current[i] === curry.placeholder && newArgs[j] === curry.placeholder) {
          finalArgs.push(curry.placeholder);
          i++; j++;
        } else if (current[i] !== curry.placeholder) {
          finalArgs.push(current[i]);
          i++;
        }
      }

      while (i < current.length) {
        finalArgs.push(current[i]);
        i++;
      }

      while (j < newArgs.length) {
        finalArgs.push(newArgs[j]);
        j++;
      }
      return curried.apply(this, finalArgs);
    };
  };
}

curry.placeholder = Symbol();


const  join = (a, b, c) => {
   return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
const _ = curry.placeholder
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(_, 2)(1, 3) // '1_2_3'
curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'