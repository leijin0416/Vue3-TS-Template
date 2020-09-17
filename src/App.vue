<template>
  <div class="create-app">
    <router-view v-wechat-title="$route.meta.title" />
    <MTabBar 
      v-if="$route.meta.displayNavBar"
      :navTabsData="navTabsData"
      @onTabsChange="onTabsChange" />
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, computed, toRefs, watch } from "vue"
import { useStore } from 'vuex'
import { sessionData } from '@/filters/storage'
import MTabBar from "@/components/navTabsBottom/index.vue"

export default {
  components: {
    MTabBar,
  },
  setup() {
    const store = useStore() // 状态管理vuex

    const state = reactive({
      navTabsData: [
        {label: '首页', name: 1, active: require('@/assets/images/nav-otc-inactive.png'), inactive: require('@/assets/images/nav-otc-active.png'), path: '/'},
        {label: '我的', name: 2, active: require('@/assets/images/nav-home-inactive.png'), inactive: require('@/assets/images/nav-home-active.png'), path: '/about'},
      ],
    })

    const getSessionNavTabrsType:any = ref()  // 初始null

    /**
     *  监听vuex
     */
    watch(() => store.state.storageUser.getSessionNavTabrsType, (newer, older) => {
      if (newer === null) {
        return
      } else {
        getSessionNavTabrsType.value = newer
        console.log(`Navs newer is ${newer}`)
      }
    }, { deep: true })
    
    onMounted(async () => {
      /**
       *  状态管理
       */
      const sessionNav = sessionData("get", "getSessionNavTabrsType", "")
      const data = store.getters["storageUser/getSessionNavTabrsType"]
      if (data === '' && sessionNav !== 'null') {
        getSessionNavTabrsType.value = sessionNav

      } else {
        getSessionNavTabrsType.value = data

      }
      console.log(data)
      console.log(sessionNav)
    })

    const onTabsChange = (index: any) => {
      // console.log(index);
    }

    return {
      ...toRefs(state),
      onTabsChange
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
</style>
