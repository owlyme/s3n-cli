const fomartStringParamToJson = key => param => typeof param === 'string' ? {
  [key]: param } : param;
// => {title: value}
const fomartTitleStringParamToJson = fomartStringParamToJson('title');

// 提示框 统一配置
const duration = 2000;

export const Toast = {
  // title 文本最多显示 7 个汉字长度
  success: (param = {}) => wx.showToast({
    title: '成功',
    icon: 'success',
    duration,
    ...fomartTitleStringParamToJson(param)
  }),
  loading: (param = {}) => wx.showToast({
    title: '加载中···',
    icon: 'lodaing',
    duration,
    ...fomartTitleStringParamToJson(param)
  }),
  show: (param = {}) => wx.showToast({
    title: '提示',
    icon: 'none',
    duration,
    ...fomartTitleStringParamToJson(param)
  }),
  close: wx.hideToast
};

export const Modal = (props = {}) => {
  wx.showModal({
    title: '提示',
    confirmText: '确定',
    confirmColor: '#FF3232',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
    ...props
  })
};

// Do something initial when launch.
export const setNavBarSize = (cb = f => f) => {
  let menuButtonObject = wx.getMenuButtonBoundingClientRect();
  wx.getSystemInfo({
    success: res => {
      //导航高度
      let statusBarHeight = res.statusBarHeight,
        navTop = menuButtonObject.top,
        navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;

      cb({
        navHeight,
        navTop,
        windowHeight: res.windowHeight,
        screenHeight: res.screenHeight,
        navBarHeight: res.screenHeight - res.windowHeight
      });

    },
    fail(err) {
      console.log(err);
    }
  });
};

export const boundingClientRect = async nodeId => {
  return new Promise((resolve) => {
    let query = wx.createSelectorQuery();
    query.select(nodeId).boundingClientRect();
    query.selectViewport().scrollOffset();


    query.exec(function(res) {
      const {
        bottom,
        height,
        left,
        right,
        top,
        width,
      } = res[0];
      const {
        scrollHeight,
        scrollLeft,
        scrollTop,
        scrollWidth
      } = res[1]; // 显示区域的竖直滚动位置
      resolve({
        target_bottom: bottom,
        target_height: height,
        target_left: left,
        target_right: right,
        target_top: top,
        target_width: width,
        viewport_scrollHeight: scrollHeight,
        viewport_scrollLeft: scrollLeft,
        viewport_scrollTop: scrollTop,
        viewport_scrollWidth: scrollWidth,
      });
    });
  });

};

export const showActionSheet = ({
  itemList = [],
  itemColor = '#000000',
  formart = f => f
}) => {
  return new Promise((resolve, reject) => {
    let list = itemList.map(i => formart(i));
    wx.showActionSheet({
      itemList: list,
      itemColor,
      success: (res) => {
        console.log(res.tapIndex);
        let selectedItem = itemList[res.tapIndex];
        resolve(selectedItem, res.tapIndex);
      },
      fail(res) {
        reject(res.errMsg);
        // Toast.show();
      }
    });
  });
};

export const chooseImage = (props) => {
  let defaultPorps = {
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
  };
  let { count, sizeType, sourceType } = props ? {...defaultPorps, ...props } : defaultPorps;

  return new Promise((resolve) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        let pathes = count === 1 ? tempFilePaths[0] : tempFilePaths;
        resolve(pathes);
      }
    });
  });
};