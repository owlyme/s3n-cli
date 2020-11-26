export const getDataset = event => event.currentTarget.dataset
// 获取data值
export const getDatasetValue = dataName => event => event.currentTarget.dataset[dataName];
// 获取input Value值
export const getInputValue = event => event.detail.value;
// 获取 input 的信息 返回 {dataName: value}
export const getNodeValue = (dataName) => event => ({
  [event.currentTarget.dataset[dataName]]: getInputValue(event)
});
// 判断滚动方向
export const isScrollUp = event => {
  let {type, detail} = event
  if (type==='scroll') {
    return detail.deltaY > 0
  }
}
// 防抖
export const debounce = (fn, wait) => {
  let timer = null;
  return (...arg) => {
    clearTimeout(timer);
    setTimeout(() => {
      fn(...arg);
    }, wait);
  };
};
// 截流
export const throttle = (fn, delay) => {
  let timer = null;
  let prevTime = Date.now();
  return (...arg) => {
    let currentTime = Date.now();
    let leftTime = delay - (currentTime - prevTime);
    clearTimeout(timer);
    if (leftTime <= 0) {
      fn(...arg);
      prevTime = currentTime;
    }
    timer = setTimeout(() => {
      fn(...arg);
    }, leftTime);
  };
};