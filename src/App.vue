<template>
  <div class="create-app">
    <router-view v-wechat-title="$route.meta.title" />
    <MTabBar 
      v-if="$route.meta.displayNavBar"
      :navTabsData="navTabsData"
      @onTabsChange="onTabsChange"></MTabBar>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, computed, toRefs, watch } from "vue"
import MTabBar from "@/components/navTabsBottom/index.vue"

export default {
  components: {
    MTabBar,
  },
  setup() {
    const state = reactive({
      navTabsData: [
        {label: '首页', name: 1, active: require('@/assets/images/nav-otc-inactive.png'), inactive: require('@/assets/images/nav-otc-active.png'), path: '/'},
        {label: '我的', name: 2, active: require('@/assets/images/nav-home-inactive.png'), inactive: require('@/assets/images/nav-home-active.png'), path: '/about'},
      ],
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
