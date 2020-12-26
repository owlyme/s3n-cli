// storage 的 key值不可以随便定义，必须提前做好限制，防止后期混乱
export const storageKeyMap = {
  keywords: 'keywords',
  isLogined: 'isLogined'
};
// 每次添加或者修改是都需要验证 key
const validateKey = key => storageKeyMap[key]

function initStorage() {
  if (!wx.getStorageSync(storageKeyMap.keywords)) {
    setLocalStorage(storageKeyMap.keywords, [])
    setLocalStorage(storageKeyMap.isLogined, false)
  }
}

initStorage();

export function setLocalStorage(key, value) {
  try {
    if (validateKey(key)) {
      wx.setStorageSync(key, JSON.stringify(value))
    } else {
      throw new Error('无效的key值')
    }
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export function getLocalStorage(key) {
  try {
    if (validateKey(key)) {
      return JSON.parse(wx.getStorageSync(key))
    } else {
      throw new Error('无效的key值')
    }
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export function addKeywordsHistory(keyword) {
  let history = getLocalStorage(storageKeyMap.keywords) || []
  let index = history.indexOf(keyword)
  if (index === -1) {
    history.unshift(keyword)
  } else {
    history.splice(index, 1)
    history.unshift(keyword)
  }
  setLocalStorage(storageKeyMap.keywords, history)
}