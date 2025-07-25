export function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

export function randomId() {
  return '_' + Math.random().toString(36).slice(2, 9);
}
