import { RouteRecordRaw } from "vue-router"

/**
 * i18n.t('loginPage_037')
 * 
 * getComponentMin() 路由懒加载
 * @param {string} name  -文件夹
 * @param {string} component  -.vue
 */
const getComponentMin = (component: any) => () =>
  import(`@/views/${component}.vue`)

const getComponentMax = (name: any, component: any) => () =>
  import(`@/views/${name}/${component}.vue`)

/**
 * @param {boolean} displayNavBar 是否需要底部导航
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string}  title 页面标题
 * 
 * @param {string}  redirect 路由重定向
 * to.meta.index || from.meta.index || this.$router.isBack
 */
export const routerMaps: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Home",
    component: getComponentMin("Home"),
    meta: { title: "NAI Trading Center", displayNavBar: true }
  },
  {
    path: "/about",
    name: "About",
    component: getComponentMin("About"),
    meta: { title: "NAI Trading Center", displayNavBar: true }
  },
  {
    path: "/text",
    name: "Text",
    component: getComponentMin("Text"),
    meta: { title: "NAI Trading Center", displayNavBar: false }
  },
]