<template>
  <div class="page">
    <div class="content">
      <NewsList />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, computed, toRefs, watch, defineAsyncComponent } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import { sessionData } from "@/filters/storage"
import { webGetInewNewsPages, webGetInewNewsChannel } from "@/mock/index"

// 异步组件 -defineAsyncComponent可以接受一个加载器函数，该函数将承诺解析返回给实际的组件
const NewsList = defineAsyncComponent(() => import('@/components/NewsList/index.vue'))

export default {
  components: {
    NewsList
  },
  setup() {
    const router = useRouter()   // 获取路由
    const route = useRoute()   // 获取路由
    const store = useStore()  // 状态管理vuex

    const counts = ref(0)
    const countId = ref(0)
    const state = reactive({
      active: 0,
      ids: "01",
      activeIds: "02",
    })
    
    /**
     *  监听vuex
     */
    watch(() => store.state.storageUser.getSessionUserToken, (newer, older) => {
      if (newer === null) {
          return
      } else {
        // 监听 vuex 地址 getSessionUserToken
        state.activeIds = newer
        console.log(`新的count${newer}----旧的count${older}`)
      }
    }, { deep: true })

    onMounted(async () => {
      /**
       *  状态管理
       */
      state.activeIds = store.getters["storageUser/getSessionUserToken"]
      store.commit("storageUser/SET_sessionUserToken", 123)
      const data = sessionData("get", "getSessionUserToken", "")

    })

    /**
     *  异步加载数据
     */
    const getInTheatersData = async () => {
      const titleDataList = await webGetInewNewsChannel({
        appkey: "ca05a06b9221f5d1"
      })
      const newsDataList = await webGetInewNewsPages({
        channel: "头条",
        start: 1,
        num: 30,
        appkey: "ca05a06b9221f5d1"
      })
    }

    return {
      ...toRefs(state), // 把一个响应式对象转换成普通对象
      counts,
      countId,
      getInTheatersData
    }
  }
}
</script>

<style lang="scss">
</style>
