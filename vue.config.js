// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require("webpack-merge");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require("ts-import-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pxtoviewport = require("postcss-px-to-viewport");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require("autoprefixer");
const isDev = process.env.NODE_ENV;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const devNeedCdn = isDev === "production" ? false : true;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isDevCS = {
  "/inew": {
    target: "http://api.jisuapi.com",
    changeOrigin: true,
    wx: true,
    pathRewrite: {
      "^/inew": "/"
    }
  }
};

module.exports = {
  // 关闭内置Eslint检查
  lintOnSave: false,
  runtimeCompiler: true,
  // 不要打包以后的map文件
  productionSourceMap: false,
  devServer: {
    open: false,
    https: false,
    proxy: isDevCS
  },
  parallel: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@assets": resolve("src/assets")
      }
    }
  },

  chainWebpack: config => {
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
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });
  }
};
