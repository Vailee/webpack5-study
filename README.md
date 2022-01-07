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

