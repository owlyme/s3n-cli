const fomartStringParamToJson = key =>  param => typeof param === 'string' ? {[key]: param} : param;
const fomartUrlStringParamToJson = fomartStringParamToJson('url');
// url 添加 '/' 开头
const fomartUrlStringParamToJsonAndStartWithSlash = (arg) => {
  let config = fomartUrlStringParamToJson(arg); 
  if (!config.url) {
    console.error('请检查app.json文件以及router/index.js文件');
  } else if (config.url.indexOf('/') !== 0) {
    config.url = '/' + config.url;
  } 
  return config;
};
const maxHistoryLength = 12;
const routeHistory = [];
const updateRouteHistory = (route) => {
  let len = routeHistory.push(route)
  if (len > maxHistoryLength) routeHistory.shift()
}
const historyBack = (index = 1) => {
  let len = routeHistory.length
  routeHistory.splice(len-index, index)
}
const historyReplace = (url) => {
  let len = routeHistory.length
  if (len) {
    routeHistory[len -1] = url
  }
}
// 导航
export const Router = {
  query: {}, // url query 参数
  params: {}, // params 参数不携带在url的参数 临时参数
  currentPath: '', // 当前的路径
  history: routeHistory,
  getQueryorParam(param) {
    let {query, params, ...other} = fomartUrlStringParamToJsonAndStartWithSlash(param);
    if (query && typeof query === 'object') {
      other.url = Object.keys(query).reduce((acc, key) => `${acc}${key}=${query[key]}&`, `${other.url}?`)
    }
    this.query = query || {};
    this.params = params || {};
    this.currentPath = other.url;
    return other
  },
  // 调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码
  refresh(param) {
    let config = this.getQueryorParam(param)
    wx.reLaunch({...config})
  },
  // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
  replace(param) {
    let config = this.getQueryorParam(param)
    historyReplace(config.url)
    wx.redirectTo({
      ...config,
      fail: (e) => {
        if (e.errMsg === 'navigateTo:fail can not navigateTo a tabbar page') {
          wx.switchTab({
            ...config
          })
        }
      }
    })
  },
  // 不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层
  push(param) {
    let config = this.getQueryorParam(param)
    updateRouteHistory(config.url)
    wx.switchTab({
      ...config,
      fail: () => {
        wx.navigateTo({
          ...config,
        })
      }
    })
  },
  //
  switchTab (param) {
    let config = this.getQueryorParam(param)
    updateRouteHistory(config.url)
    wx.switchTab({...config})
  },
  // 返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，s决定需要返回几层。
  back(delta = 1, params) {
    this.params = params || {}
    historyBack(delta)
    wx.navigateBack({delta})
  },
  // 获取Params
  // Params 是临时参数 即用即消 防止因缓存影响判断逻辑
  getParams() {
    let params = this.params
    this.params = {}
    return params
  }
};


exports.default = Router;