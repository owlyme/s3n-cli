## 工作模板
```
npm install -g s3n-cli
```
## 
yarn 安装会出现奇怪的问题

## 介绍内容
0. 电脑安装node, vscode
1. 通过命令行帮我们生成同意的文件接口，工作模板
    - 小程序开发模板
        - [weui](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/quickstart.html)
        - [有赞](https://github.com/youzan/vant-weapp)
        - [有赞小程序](https://vant-contrib.gitee.io/vant-weapp/#/quickstart)
    - 多页面开发模板
    - uniApp文件模板（后期-这个月内完成）
2. 可以统一代码编写风格
3. 合作维护公司的代码组件库
    - 组件开发需要
    - 组件的接口
        - 模拟数据
    - 组件的样式
    - 小程序组件必须要有 customClass, customStyle 属性
    - ```html
    <view class="xxx-components {{customClass}}" style="{{customStyle}}">
    </view>
    ```
## 功能
1. 2020/12/24 添加路径判断功能