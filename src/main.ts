import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import { Lazyload, Toast } from 'vant'  // 图片懒加载
import "./style/common.scss"

import VueWechatTitle from "vue-wechat-title"
import { vantPlugins } from "./plugins/vant"

createApp(App)
  .use(store)
  .use(router)
  .use(VueWechatTitle)
  .use(vantPlugins)
  .use(Toast)
  .use(Lazyload, {
    lazyComponent: true,
    error: require('@/assets/error.jpg'),      //报错需要的图片
    loading: require('@/assets/loading.png')	// 替换需要的图片
  })
  .mount("#app")
