# 这是第一个vue项目
## 我们是有灵魂的程序员，所以我们的代码富有诗意
## 制作首页App组件
1、完成Header区域，使用的是Mint-UI中的Header组件
2、制作底部的Tabbar区域，使用的是MUI的Tabbar.html
    +制作购物车小图标的操作细节：
    +先把扩展图标的css样式拷贝到项目中
    +拷贝扩展字体库 .ttf 文件到项目中
    +为购物车小图标添加如下样式：class="mui-icon mui-icon-extra mui-icon-extra-cart"
3、要在中间区域放置一个router-view来展示路由匹配到的组件

## 改造tabber为router-link

## 设置路由高亮

## 点击tabber中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
    1、获取数据，使用vue-resource
    npm i vue-resource -S
    2、使用vue-resource的this.$http.get获取数据
    3、获取到的数据要保存到data身上
    4、使用v-for循环渲染每个item项
    
## 改造九宫格区域的样式
    移动端图片的大小应设置为实际图片大小的一半
## 改造新闻资讯路由链接
## 新闻资讯页面制作
    1、绘制界面，使用MUI中的media-list.html
    2、使用Vue-resource获取数据
    3、渲染真实数据
    
## 实现新闻资讯列表点击跳转到新闻详情
    1、将列表中的每一项改造为router-link，同时在跳转的时候应该提供唯一的Id标识符
    2、创建新闻详情的组件页面 NewsInfo.vue
    3、在路由模块中，将新闻详情的路由地址和组件页面对应起来
    
## 实现新闻详情的页面布局和数据渲染
## 单独封装一个 comment.vue 评论子组件
    1、先创建一个单独的 comment.vue 组件模板
    2、在需要使用 comment 组件的页面中，先手动导入comment组件
    import comment from './comment.vue'
    3、在父组件中，使用 components 属性，将刚才导入的 comment 组件，注册为自己的子组件
    4、将注册子组件时候的注册名称以标签的形式在页面中引用即可
    
## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
    1、为加载更多按钮绑定点击事件，在事件中，请求下一页数据
    2、点击加载更多，让pageIndex++，然后重新调用 this.getComments() 方法来重新获取最新一页的数据
    3、为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据
    调用数组的 concat 方法，拼接上新的数组
    
## 发表评论
    1、把文本框作双向数据绑定
    2、为发表按钮绑定一个事件
    3、校验评论内容是否为空，如果为空，则Toast提示用户，评论内容不能为空
    4、通过 vue-resource 发送一个请求，把评论内容提交给服务器
    5、当发表评论ok后，重新刷新列表，以查看最新的评论
    6、如果调用 getComments 重新刷新列表的话，可能只能得到最后一页的评论，前几页的评论获取不到，
       换一种思路：当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的unshift方法，
       把最新的评论，把最新的评论追加到 data 中 comments 的开头；这样就能完美实现刷新评论列表的需求
        
## 改造图片分享按钮为路由的链接并显示对应的组件页面
    1、制作顶部的滑动条
    2、制作底部的图片列表

## 绘制图片列表组件页面结构并美化样式

### 制作顶部滑动条
1、需要借助于 MUI 中的 tab-top-webview-main.html
2、需要把 slider 区域的 mui-fullscreen 这个类去掉
3、滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，
   需要被初始化一下：
   +导入 mui.js
   +调用官方提供的方式去初始化：
  ```
  mui('.mui-scroll-wrapper').scroll({
  	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
4、我们在初始化滑动条的时候，导入了 mui.js，但是控制台报错了:
 ` Uncaught TypeError:'caller','callee'and 'arguments' properties may not be accessed on strict mode`
 +经过推测，觉得可能是 mui.js 中用到了 'caller','callee'and 'arguments'，但是webpack打包好的bundle.js中，
 +默认是启用严格模式的，所以这两者冲突了；
 +解决方案：把webpack打包时候的严格模式禁用掉；
 +使用 babel-plugin-transform-remove-strict-mode
 +先使用npm来安装它：npm i babel-plugin-transform-remove-strict-mode -D
 +配置 .babelrc   {"plugins":["transform-remove-strict-mode"]}
 
5、刚进入图片分享页面的时候，滑动条无法正常工作，经过分析发现，如果要初始化滑动条，必须要等DOM元素
加载完毕，所以把初始化滑动条的代码搬到了 mounted 生命周期函数中。
6、当滑动条调试OK后，发现tabbar无法正常工作了，这时候，我们需要把每个tabbar按钮样式中的类 
`mui-tab-item` 重新改一下名字
7、获取所有分类，并渲染分类列表

### 制作图片列表区域
1、图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的组件 `lazy load`
2、根据 `lazy load ` 的使用文档尝试使用
3、渲染图片列表数据

### 实现了图片列表的懒加载改造和样式美化

## 实现了点击图片跳转到图片详情页面
1、在改造 li 标签为 router-link 的时候，需要使用 tag 属性指定 router-link 渲染为哪种标签，因为 router-link
默认是渲染为 a 标签的；

## 实现图片详情页面的布局和美化，同时获取数据和渲染页面

## 实现图片详情中缩率图的功能
1、使用 vue-preview 这个缩略图插件
2、获取所有的图片列表，然后使用 v-for 指令渲染数据
3、注意：img 标签的 class属性不能去掉
4、注意：每个图片数据对象中，必须有 w 和 h 属性

## 绘制商品列表页面基本结构并美化

## 尝试在手机上去进行项目的预览和测试
1、要保证手机和开发项目的电脑处于同一个 WIFI 环境中，也就是说手机可以访问到电脑的IP
2、打开自己项目中的package.json文件，在dev脚本中，添加一个 --host 指令，把当前电脑的 WIFI IP地址，
设置为 --host 的指令值；`  "scripts": {
                               "test": "echo \"Error: no test specified\" && exit 1",
                               "dev": "webpack-dev-server --open --hot --host 192.168.1.103"
                            } `
  + 如何查看自己电脑所处 WIFI 的IP呢？需要在cmd终端运行 `ipconfig` ，查看无线网的ip地址
3、运行项目，在手机上输入项目运行的地址 http://192.168.1.101:8080/#/home 即可访问同一个页面