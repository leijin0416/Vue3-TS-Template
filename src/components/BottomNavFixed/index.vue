<template>
  <div class="v-navtabs-box">
    <van-tabbar 
      v-model="active" 
      @change="onTabsChange"
      :placeholder="true"
      :border="true"
      z-index="9999">
      <van-tabbar-item 
        v-for="(item, index) of navTabsData"  
        :key="item.name"
        :to="item.path" 
        :name="item.name">
        <span>{{ item.label }}</span>
        <!-- 图标 -->
        <template #icon="props">
          <img :src="props.active ? item.inactive : item.active" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRef, onMounted, computed, toRefs, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import { sessionData } from "@/filters/storage"

export default {
  props: {
    navTabsData: {
      type: Array,
      required: true
    }
  },
  setup(props:any, context:any) {
    // console.log(props.navTabsData[0].label)
    // ctx.emit('event')
    const router = useRouter()   // 路由
    const route = useRoute()    // 获取路由信息
    const store = useStore()    // 状态管理vuex
    const vuexStoreNav = store.state.vuexStorageNav

    const state = reactive({
      id: 1,
    })
    const active = ref(1)


    /**
     *  监听vuex -获取底部导航栏的切换ID
     */
    watch(() => vuexStoreNav.getSessionNavTabrsID, (newer, older) => {
      if (newer === null) return
      else {
        active.value = newer
        console.log(`Watch__刷新底部切换导航ID__${newer}`)
      }
    }, { deep: true })

    onMounted(async () => {
      const vuexNavId = store.getters["vuexStorageNav/getSessionNavTabrsID"]
      const sessionTabs = sessionData("get", "getSessionNavTabrsID", "")

      if (vuexNavId === '' && sessionTabs === null) {
        // 第一次进来的时候
        active.value = 1

      } else if (vuexNavId === '' && sessionTabs !== null) {
        // 刷新页面的时候
        let displayNavBar = route.meta.displayNavBar
        if (displayNavBar) {
          if (sessionTabs === "1") router.push("/")
          else if (sessionTabs === "2") router.push("/home")
          else return
        }
        active.value = Number(sessionTabs);

        console.log(`缓存__刷新底部切换导航ID__${sessionTabs}`)
        // Reflect.set(active, 0, Number(sessionTabs))
        
      } else {
        // 默认
        active.value = Number(vuexNavId)
      }
      console.log(`VUEX__刷新底部切换导航ID__${vuexNavId}`);
    })

    // 组件上下文对象的底部切换导航ID
    const onTabsChange = (index: any) => {
      store.commit("vuexStorageNav/SET_sessionNavTabrsID", index)
      context.emit("onTabsChange", index)
    }

    return {
      ...toRefs(state),
      active,
      onTabsChange
    }
  }
}
</script>

<style lang="scss" scoped>
.v-navtabs-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100px;
}
/deep/.van-tabbar-item--active {
  color: #fe4f70;
  background-color: transparent;
}
/deep/.van-tabbar-item__icon img {
  width: 30px;
  height: 30px;
}
</style>