import { RouteRecordRaw } from "vue-router"

/**
 * i18n.t('loginPage_037')
 * 
 * 路由懒加载
 * @param {string} name       -文件夹
 * @param {string} component  -.vue
 */
const getComponentMin = (component: any) => () =>
  import(`@/views/${component}.vue`)

const getComponentMax = (name: any, component: any) => () =>
  import(`@/views/${name}/${component}.vue`)

/**
 * to.meta.index || from.meta.index || this.$router.isBack
 * 
 * @param {boolean} displayNavBar   是否需要底部导航
 * @param {boolean} keepAlive       是否缓存页面
 * @param {string}  title           页面标题
 * @param {string}  redirect        路由重定向
 */
export const routerMaps: Array<RouteRecordRaw> = [
  // 重定向：
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    component: getComponentMin("Index"),
    meta: { title: "NAI Trading Center", keepAlive: true, displayNavBar: true }
  },
  {
    path: "/home",
    name: "Home",
    component: getComponentMin("Home"),
    meta: { title: "NAI Trading Center", keepAlive: true, displayNavBar: true }
  }, 
  {
    path: "/home/modify",
    name: "Modify",
    component: getComponentMax('user', 'index'),
    meta: { title: "NAI Trading Center", keepAlive: false, displayNavBar: false }
  },
  {
    path: "/docs",
    name: "Docs",
    component: getComponentMax('docs', 'index'),
    meta: { title: "NAI Trading Center", keepAlive: true, displayNavBar: false }
  },
]