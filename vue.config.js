const path = require('path');
const autoprefixer = require('autoprefixer')


function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? '/fb/static/': '/',
  css: {
    loaderOptions: {
      css:{
        importLoaders: 1
      },
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ],
        importLoaders: 1
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8"
            ]
          })
        ]
      }
    }
  },
  devServer: {
    // proxy: {
    //   //配置跨域
    //   '/api': {
    //     target: "http://www.scdcd.top:9021/fb",
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // },
    port:'80',
    disableHostCheck: true
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('common', resolve('src/common'))

  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  

}
