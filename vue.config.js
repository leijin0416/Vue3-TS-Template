const webpack = require("webpack")
const merge = require("webpack-merge")
const tsImportPluginFactory = require("ts-import-plugin")
const pxtoviewport = require("postcss-px-to-viewport")

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin") // gzip
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}

const autoprefixer = require("autoprefixer")
const productionGzips = /\.(js|css|json|ts|html|ico|svg)(\?.*)?$/i
const isDev = process.env.NODE_ENV
const isProduction = process.env.NODE_ENV !== "development"
const devNeedCdn = isDev === "production" ? false : true

// cdn链接
const cdn = {
  externals: {
    "axios": "axios",
    // 'vant': 'Vant',
  },
  css: [
    // "https://cdn.jsdelivr.net/npm/vant@3.0.0-alpha.4/lib/index.min.css"
  ],
  js: [
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
  }
}

module.exports = {
  runtimeCompiler: true,
  // 不要打包以后的map文件
  productionSourceMap: false,
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
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375,
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    if (isProduction || devNeedCdn) config.externals = cdn.externals
    if (isDev === "production") {
      config.plugins.push(
        // 压缩代码
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          filename: "[path].gz[query]",
          test: productionGzips,
          threshold: 10240, // 只有大小大于该值的资源会被处理
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        }),
        // 添加自定义代码压缩配置
        new ParallelUglifyPlugin({
          uglifyJS: {
              output: {
                  beautify: false,
                  comments: false,
              },
              warnings: false,
              compress: {
                  reduce_vars: true,
                  drop_debugger: true,
                  drop_console: true,
              }
          },
          test: /.js$/g,
          sourceMap: false,
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
    // ============注入cdn start============

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
        });
        return options
      })
  },
  transpileDependencies: [
    "biyi-admin", // 指定对第三方依赖包进行babel-polyfill处理
  ]
}
