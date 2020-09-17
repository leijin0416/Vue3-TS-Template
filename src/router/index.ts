import { createRouter, createWebHistory } from "vue-router"
import { routerMaps } from './routerMap'
// 状态管理vuex
import store from "@/store"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routerMaps,
});

let history = window.sessionStorage;
let count = history.getItem('count') || 0;
let numCount = Number(count)
history.removeItem('count')

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    // 第一级栏目
    const subArr = ['/', '/index', '/about']
    const [toIndex, prevIndex] = [history.getItem(to.path), history.getItem(from.path)]
    for (let index in subArr) history.setItem(subArr[index], '0')
    const numToIndex = Number(toIndex)  // 当前
    const numPrevIndex = Number(prevIndex) // 过去的

    // console.log(numToIndex)
    // console.log(numPrevIndex)

    if (!subArr.includes(to.path)) {
      ++numCount
      history.setItem(to.path, numCount.toString())
      store.commit('storageUser/SET_sessionNavTabrsType', 'next')
    } else {
      if (numToIndex || numToIndex === 0) {
        if (numToIndex > numPrevIndex) {
          store.commit('storageUser/SET_sessionNavTabrsType', 'next')
  
        } else if (numToIndex === numPrevIndex) {  // 一级栏目无切换效果
          store.commit('storageUser/SET_sessionNavTabrsType', null)
  
        } else {
          store.commit('storageUser/SET_sessionNavTabrsType', 'prev')
        }
      }
    }
    next()
  }
});

export default router
