import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import VueWechatTitle from "vue-wechat-title"
import { vantPlugins } from "./plugins/vant"

createApp(App)
  .use(store)
  .use(router)
  .use(vantPlugins)
  .use(VueWechatTitle)
  .mount("#app");
