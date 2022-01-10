# webpack

## 安装

`npm i webpack webpack-cli -D`

webpack.config.js 重命名 ` "build": "webpack --config webpack.config2.js" `

### loader

webpack只能理解js json ，loader可以处理其他类型文件

### plugin 

loader 用于转换类型模块 ，而插件用于执行范围更广的任务，打包优化，资源管理，注入环境变量

### devServer

### 支持css

- `css-loader` 用来翻译处理@import和 url()

- `style-loader` 把css插入到DOM中

- 支持less sass `npm i less less-loader node-sass sass-loader -D`

### 支持图片

`npm i file-loader url-loader -D`

- file-loader 把文件拷贝到dest 并改名，默认使用es6模块

- url-loader 是file-loader的增强 ,limit的配置

#### 在webpack中使用图片的三种方式

- 直接通过import 或者 require

- 通过devServe配置

## 转译ES6/ES7/JSX

```js
npm i babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/polyfill -D
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
```

- babel-loader 转译js文件 调用babelCore 把源代码转换成抽象语法树，进行遍历和生成
- @babel/core babel的核心包
- @babel/preset-env 环境预设
- @babel/preset-react React
- @babel/plugin-proposal-decorators 类和对象装饰器编译成ES5
- @babel/plugin-proposal-class-properties -D 转换静态类属性以及使用属性初始值化语法声明的属性

先把ES6代码转成ES5语法树 babelCore
然后调用preset-env把ES6语法树转成ES5语法树 preset-env
再把ES5语法树重新生成ES5代码 babelCore

`https://polyfill.io/v3/polyfill.min.js` 加入index.js配置私服

## eslint

`npm i eslint eslint-loader babel-eslint -D` 

## 引入第三方模块 

- 直接下载 impost导入 `import _ from loader`
- new webpack.ProviderPlugin({
  _:'lodash'
})
- 在  module的rules里
  {
    test:require.resolve('lodash),
    loader:'expose-loader',
    options:{
      exposes:{
        globalName:'_',
        override:true
      }
    }
  }

## webpack-dev-middleware

webpack-dev-server和middleware的区别
middleware 在既有的express基础上加载易于扩展