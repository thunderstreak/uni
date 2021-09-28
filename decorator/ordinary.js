export const setDebounceDecorator = (wait) => (_target, _name, descriptor) => {
  const fn = descriptor.value;
  let timer = null;
  descriptor.value = function newDescriptor(...args) {
    const e = args[0];
    e.persist();
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      return fn.apply(this, args);
    }, wait);
  };
  return descriptor;
};

export const setThrottleDecorator = (delay) => (_target, _name, descriptor) => {
  const fn = descriptor.value;
  let timer = null;
  descriptor.value = function newDescriptor(...args) {
    const e = args[0];
    e.persist();
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        return fn.apply(this, args);
      }, delay);
    }
  };
  return descriptor;
};

export const setTryCatchDecorator = (toast) => (_target, _name, descriptor) => {
  const fn = descriptor.value;
  descriptor.value = function (...args) {
    try {
      return fn.apply(this, args)
    } catch(e) {
      console.log(`${_name}:`, e);
      toast(`${_name}: parse Error`)
    }
  };
  return descriptor;
};
