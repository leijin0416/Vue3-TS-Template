<template>
  <div class="router-view">
    所有的学习，最开始都像是在照镜子，无非是学到了，再换一个老师，换一面镜子，直到有一天你发现，你的新的镜子里是你自己，你就有你自己的方法了，你就可以做别人的镜子了
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRef, onMounted, computed, toRefs, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import { sessionData } from "@/filters/storage"

export default {
  props: {
  },
  setup(props:any, context:any) {
    // console.log(props.navTabsData[0].label)
    // ctx.emit('event')
    const router = useRouter()   // 路由
    const route = useRoute()    // 获取路由信息
    const store = useStore()    // 状态管理vuex

    const state = reactive({
      id: 1,
    })
    const active = ref(1)

    /**
     *  监听vuex -获取底部导航栏的切换ID
     */
    watch(() => state.id, (newer, older) => {
      if (newer === null) return
      else {
        console.log(`Watch navTab newer is ${newer}`)
      }
    }, { deep: true })

    onMounted(async () => {
    })

    // 组件上下文对象的底部切换导航ID
    const onTabsChange = (index: any) => {
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
</style>