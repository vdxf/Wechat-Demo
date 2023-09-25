## 小程序与普通页面开发的区别

 1. 运行环境不同
  - 网页运行在浏览器环境中
  - 小程序运行在微信程序中

2. API 不同
  - 在小程序中， 无法调用 DOM 与 BOM 的API, 但是可以调用微信环境提供的各种API

3. 开发模式不同
  - 网页开发模式： 浏览器 + 代码编辑器
  - 小程序：
      - 申请小程序开发账号
      - 安装小程序开发者工具
      - 创建和配置小程序项目

## WXML 与 HTML 的区别
1. 标签名称不同
   - HTML (div, span, img, a)
   - WXML (view, text, image, navigator)

2. 属性节点不同
   - <a href="#"></a>
   - <navigator url="/pages/home/home"></navigator>
3. 提供了类似Vue中的模板语法
   - 数据绑定
   - 列表渲染
   - 条件渲染

## WXSS 与 CSS 的区别

1. 新增 rpx 尺寸单位
   - CSS 中需要手动进行单位换算，如rem
   - WXSS 在底层支持最新的尺寸单位 rpx，在不同尺寸的屏幕上小程序会自动进行换算

2. 提供了全局的样式和局部样式
   - 项目根目录中的 app.wxss 会作用于所有小程序页面
   - 局部页面的 .wxss 样式仅对当前页面生效

3. WXSS 仅支持部分 CSS 选择器

## 事件
click -> tap

当事件回调触发时，会收到一个事件对象，它的详细属性如下：

   type            String          事件类型

   timeStamp       Integer         页面打开到触发事件所经过的毫秒数
   `target`        Object          触发事件的组合的一些属性值集合
   currentTarget   Object          当前组件的一些属性值集合
   `datail`        Object          额外的信息
   touches         Array           触摸事件，当前停留在在屏幕中的触摸点信息的数组
   changedTouches  Array           触摸事件，当前变化的触摸点信息的数组

## request 注意事项

1. 域名只支持 https 协议
2. 域名不能使用 IP 地址或 localhost
3. 域名必须经过 ICP 备案
4. 服务器域名一个月最多可申请 5 次修改