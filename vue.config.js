const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")
const pxtoviewport = require("postcss-px-to-viewport")
const tsImportPluginFactory = require("ts-import-plugin")   // Vant按需加载

// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const CompressionWebpackPlugin = require("compression-webpack-plugin") // gzip
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin
const TerserPlugin = require("terser-webpack-plugin")

function resolve(dir) { return path.join(__dirname, dir) }
const autoprefixer = require("autoprefixer")
const productionGzips = /\.(js|css|json|ts|html|ico|svg)(\?.*)?$/i;

const isDev = process.env.NODE_ENV;
const isProduction = process.env.NODE_ENV !== "development";
const devNeedCdn = isDev === "production" ? false : true;

// cdn链接
const cdn = {
  externals: {
    "axios": "axios",
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
  },
  css: [
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.global.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@4.0.0-rc.1/dist/vuex.global.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@4.0.0/dist/vue-router.global.min.js',
    "https://cdn.jsdelivr.net/npm/axios@0.20.0/dist/axios.min.js",
  ]
}

const isDevCS = {
  "/inew": {
    target: "http://api.jisuapi.com",
    changeOrigin: true,
    wx: true,
    pathRewrite: {
      "^/inew": "/",
    }
  },
  "/newbee": {
    target: "http://47.99.134.126:28019/api/v1",
    changeOrigin: true,
    wx: true,
    pathRewrite: {
      "^/newbee": "/",
    }
  }
}

module.exports = {
  runtimeCompiler: true,
  // 不要打包以后的map文件
  productionSourceMap: false,
  // 未配置可能导致build后vantUI 无样式
  parallel: false,
  // 关闭内置Eslint检查
  lintOnSave: false,
  devServer: {
    open: false,
    https: false,
    proxy: isDevCS,
  },
  parallel: false,
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        // prependData 最新
        prependData: `
          @import "@/style/mixin.scss";
          @import "@/style/_var.scss";
        `
      },
      postcss: {
        plugins: (loader) => [
          autoprefixer(),
          require('postcss-px-to-viewport')({
              viewportWidth: 750,     // 视窗的宽度
              viewportHeight: 1080,   // 视窗的高度
              unitPrecision: 3,       // 单位转换后保留的精度
              viewportUnit: 'vw',     // 希望使用的视口单位
              fontViewportUnit: 'vw', // 字体使用的视口单位
              minPixelValue: 1,
              mediaQuery: false,  // 媒体查询里的单位是否需要转换单位
              exclude: /(\/|\\)(node_modules)(\/|\\)/,   // 忽略某些文件夹下的文件或特定文件
              selectorBlackList: ['.ignore', '.hairlines'],    // 指定不转换为视窗单位的类
              landscapeUnit: 'vw', // 横屏时使用的单位
              landscapeWidth: 568 //  横屏时使用的视口宽度
          }),
        ]
      }
    }
  },
  configureWebpack: config => {
    // cdn 添加
    if (isProduction || devNeedCdn) config.externals = cdn.externals
    if (isDev === "production") {
      // 将每个依赖包打包成单独的js文件
      const optimization = {
        // 启用最小化压缩
        minimize: true,
        minimizer: [new TerserPlugin({
          // 和productionSourceMap一样
          // sourceMap: false,
          terserOptions: {
            compress: {
              // 移除所有console相关的代码，比如console.log,console.error
              drop_console: true,
              // 关闭自动断点功能，vue代码里插入debugger指令后，执行到对应位置会自动断线，此选项是移除debugger指令
              drop_debugger: true,
              // pure_funcs数组是用来配置移除指定的指令，比如console.log  alert等等
              // 移除console.log，需要配合.eslintrc.js文件里的如下设置，不然打包会出警告
              // rules: {
              //   'no-console':  'off',
              // }
              pure_funcs: ['console.log', 'console.error']
            }
          }
        })]
      }
      // 将optimization的所有属性合并到config里
      Object.assign(config, {
        optimization
      })
      config.plugins.push(
        // 删除
        // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        // 压缩代码
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          filename: "[path].gz[query]",
          test: productionGzips,
          threshold: 10240,             // 只有大小大于该值的资源会被处理
          minRatio: 0.8,                // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false,  // 删除原文件
        }),
        // 体积压缩提示
        new BundleAnalyzerPlugin(),
      )
      // 公共代码抽离
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100,
            },
            common: {
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60,
            },
            styles: {
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all",
              enforce: true,
            },
            runtimeChunk: {
              name: "manifest",
            }
          }
        }
      }
    }
  },
  chainWebpack: config => {
    // 最小化代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all",
    })
    // ============注入cdn start============
    config.plugin("html").tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
    // ============注入cdn   end============
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))

    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: true,
              })
            ]
          }),
          compilerOptions: {
            module: "es2015",
          }
        })
        return options
      })
  },
  transpileDependencies: [
    "biyi-admin", // 指定对第三方依赖包进行babel-polyfill处理
  ]
}
