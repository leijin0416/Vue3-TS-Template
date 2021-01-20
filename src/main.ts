import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import { Lazyload } from 'vant'
import "./style/common.scss"

import VueWechatTitle from "vue-wechat-title"
import { vantPlugins } from "./plugins/vant"

createApp(App)
  .use(store)
  .use(router)
  .use(VueWechatTitle)
  .use(vantPlugins)
  .use(Lazyload, {
    lazyComponent: true,
  })
  .mount("#app")
