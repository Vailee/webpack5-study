const {
  resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development', // production
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'), // 输出文件夹对绝对路径
    filename: 'main.js', //输出的文件名
    publicPath: '/'
  },
  // devServer会启动一个http开发服务器，把一个文件夹作为静态根目录
  // 为了提高性能，使用的是内存文件系统
  devServer: { //npm i webpack-dev-server -D
    // contentBase: resolve(__dirname, 'static'), //额外的静态文件根目录,非必需
    // writeToDisk: true, //打包后的文件写入硬盘一份
    // open: true, //自动打开浏览器
    // publicPath: '/'
    port: 8080,
    compress: true, // 是否启动压缩
    static: [ //v5新写法
      {
        directory: resolve(__dirname, "static"),
        publicPath: '/' //额外的静态文件根目录,非必需 在static和文件夹image之间的路径
      },
      // {
      //   directory: resolve(__dirname, "static"),
      //   publicPath: '/css' //额外的静态文件根目录,非必需
      // }
    ],
    devMiddleware: {
      publicPath: "/",
      //  绑定中间件的公共路径  使用与webpack相同 
      // index: "index.html",
      //  Web服务器的索引路径，默认为“index.html”。 
      //  如果falsy（但不是未定义），服务器将不会响应到根URL的请求。 

      headers: {
        "X-Custom-Header": "yes"
      },
      //  自定义标题  

      mimeTypes: {
        "text/html": ["phtml"]
      },
      //  添加自定义mime /扩展映射 
      // https://github.com/broofa/node-mime#mimedefine  
      // https://github.com/webpack/webpack-dev-middleware/pull/150  

      stats: {
        colors: true
      },
      //  用于形成统计信息的选项 

      serverSideRender: false,
      //  关闭服务器端渲染模式。有关详细信息，请参阅服务器端渲染部分。
    },
    client: {
      progress: true, //在浏览器中以百分比显示编译进度。
    },
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: 'eslint-loader', // 先代码校验，再编译代码
        enforce: 'pre', //强制指定顺序 pre normal inline post
        options: {
          fix: true
        },
        exclude: /node_modules/,
        include: resolve(__dirname, 'src')
      },
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            // 预设是插件的集合
            presets: [
              ["@babel/preset-env", {
                useBuiltIns: 'usage', // 按需加载polyfill
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9'
                }
              }], //转换js语法
              "@babel/preset-react" // 转换jsx语法
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", {
                legacy: true
              }],
              ["@babel/plugin-proposal-class-properties", {
                legacy: true
              }]
            ]
          }
        }]
      },
      {
        test: /.txt$/,
        use: 'raw-loader', //npm i raw-loader -D
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // npm i style-loader css-loader -D
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif|bmp)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:10].[ext]', // 哈希前10位+扩展名
            esModule: false, // 不使用es6模块
          }
        }],
        // use: [{
        //   loader: 'url-loader',
        //   options: {
        //     name: '[hash:10].[ext]', // 哈希前10位+扩展名
        //     esModule: false, // 不使用es6模块
        //     limit: 128 * 1024
        //   }
        // }]
      },
      {
        test: /\.html$/,
        use: ['html-loader'] //解析html中出现的相对路径
      },


    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}