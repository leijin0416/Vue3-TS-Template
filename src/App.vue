<template>
  <div class="create-app">
    <!-- END： can no longer be used directly inside -->
    <router-view v-wechat-title="$route.meta.title" v-slot="{ Component }">
      <transition :name="'vux-pop-'+(getSessionNavTabrsType === 'next' ? 'in' : getSessionNavTabrsType ==='prev' ? 'out' : '')">
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
import { useStore } from "vuex"
import { sessionData } from "@/filters/storage"

// 异步组件 -defineAsyncComponent可以接受一个加载器函数，该函数将承诺解析返回给实际的组件
const BottomNavTabs = defineAsyncComponent(() => import('@/components/BottomNavFixed/index.vue'))

export default {
  components: {
    BottomNavTabs,
  },
  setup() {
    const store = useStore() // 声明、获取 状态管理vuex
    const state = reactive({
      navTabsData: [
        {label: "首页", name: 1, active: require('@/assets/images/nav-otc-inactive.png'), inactive: require('@/assets/images/nav-otc-active.png'), path: "/"},
        {label: "我的", name: 2, active: require('@/assets/images/nav-home-inactive.png'), inactive: require('@/assets/images/nav-home-active.png'), path: '"/about'},
      ],
    })
    const getSessionNavTabrsType:any = ref()  // 初始null

    /**
     *  监听vuex -获取底部导航栏的切换状态
     */
    watch(() => store.state.storageUser.getSessionNavTabrsType, (newer, older) => {
      if (newer === null) return
      else {
        getSessionNavTabrsType.value = newer
        console.log(`Watch-Vuex navType newer is：${newer}`)
      }
    }, { deep: true })
    
    onMounted(async () => {
      /**
       *  状态管理  -获取底部导航栏的切换状态
       *  页面刷新
       */
      const sessionNav = sessionData("get", "getSessionNavTabrsType", "")
      const data = store.getters["storageUser/getSessionNavTabrsType"]
      if (data === '' && typeof sessionNav === "string") {
        getSessionNavTabrsType.value = sessionNav

      } else {
        getSessionNavTabrsType.value = data

      }
      // console.log(data)
      // console.log(sessionNav)
    })

    const onTabsChange = (index: any) => {
      console.log(`组件上下文对象的底部切换导航ID：${index}`)
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
* {
  padding: 0;
  margin: 0;
}
#app {
  color: #333;
  font-size: 16px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  position: relative;
  z-index: 9999;
  will-change: transform;
  transition: all 0.3s linear;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 500px;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
