<template>
  <div class="create-app">
    <router-view v-wechat-title="$route.meta.title" v-slot="{ Component }" v-if="$route.meta.keepAlive">
      <transition :name="'vux-pop-'+(getSessionNavTabrsType == 'next' ? 'in' : getSessionNavTabrsType == 'prev' ? 'out' : '')">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- 不缓存 -->
    <router-view v-wechat-title="$route.meta.title" v-slot="{ Component }" v-if="!$route.meta.keepAlive">
      <transition :name="'vux-pop-'+(getSessionNavTabrsType == 'next' ? 'in' : getSessionNavTabrsType == 'prev' ? 'out' : '')">
        <component :is="Component" />
      </transition>
    </router-view>

    <BottomNavTabs 
      v-if="$route.meta.displayNavBar"
      :navTabsData="navTabsData"
      @onTabsChange="onTabsChange" />
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, computed, toRefs, watch, defineAsyncComponent } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import { sessionData } from "@/filters/storage"

// 异步组件 -defineAsyncComponent 可以接受一个加载器函数，该函数将承诺解析返回给实际的组件;
const BottomNavTabs = defineAsyncComponent(() => import('@/components/BottomNavFixed/index.vue'))

export default {
  components: {
    BottomNavTabs,
  },
  setup() {
    const route = useRoute()    // 获取路由信息
    const store = useStore()    // 声明、获取 状态管理vuex
    const vuexStoreNav = store.state.vuexStorageNav
    const state = reactive({
      navTabsData: [
        {label: "首页", name: 1, active: require('@/assets/images/banner_active1.png'), inactive: require('@/assets/images/banner_inactive1.png'), path: "/"},
        {label: "我的", name: 2, active: require('@/assets/images/banner_active2.png'), inactive: require('@/assets/images/banner_inactive2.jpg'), path: '"/home'},
      ],
    })
    const getSessionNavTabrsType: any = ref()  // 初始null

    /**
     *  监听vuex -获取底部导航栏的切换状态
     */
    watch(() => vuexStoreNav.getSessionNavTabrsType, (newer, older) => {
      // console.log(typeof newer);
      if (newer === 'null') return getSessionNavTabrsType.value = ''
      else {
        getSessionNavTabrsType.value = newer
        console.log(`Watch__刷新【底部】切换导航动画类型__${newer}`)
      }
    }, { deep: true })
    
    onMounted(async () => {
      /**
       *  状态管理  -获取底部导航栏的切换状态
       *  页面刷新
       */
      const sessionNavType = sessionData("get", "getSessionNavTabrsType", "")
      const typeData = store.getters["vuexStorageNav/getSessionNavTabrsType"]
      const displayNavBar = route.meta.displayNavBar
      
      if (typeData === '' && typeof sessionNavType === "string") {
        getSessionNavTabrsType.value = sessionNavType
      } else {
        getSessionNavTabrsType.value = typeData
      }
    })

    const onTabsChange = (index: any) => {
      console.log(`__刷新底部切换导航ID__${index}`)
    }

    const removeVeget = (index: any) => {
      state.navTabsData.splice(index, 1);
    }

    // 暴露给外界组件使用
    return {
      ...toRefs(state),
      getSessionNavTabrsType,
      onTabsChange,
      removeVeget
    }
  },
}
</script>

<style lang="scss">
// 谷歌字体
@import url("https://fonts.font.im/css2?family=Noto+Sans&display=swap");
*{
  padding: 0;
  margin: 0;
}
#app {
  font-size: 28px;
  width: 100%;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 500px;
  transition: all 0.3s linear;
}
// 后退
.vux-pop-out-enter, .vux-pop-in-leave-active {
  z-index: 9999;
  position: fixed;
  top: 0;
  transform: translate3d(-100%, 0, 0);
}
// 前进
.vux-pop-in-enter, .vux-pop-out-leave-active {
  z-index: 9999;
  position: fixed;
  top: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
