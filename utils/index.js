module.exports = {
  debounce(cb, wait = 400) {
    let timer = null

    return (...arg) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        cb(...arg)
      }, wait)
    }
  }
}