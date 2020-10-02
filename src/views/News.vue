<template>
  <div class="pages">
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, computed, toRefs, watch, defineAsyncComponent } from "vue"
import { useStore } from "vuex"
import { sessionData } from "@/filters/storage"


export default {
  components: {
  },
  setup() {
    const store = useStore() // 声明、获取 状态管理vuex
    const state = ref(0)

    /**
     *  监听vuex -获取底部导航栏的切换状态
     */
    watch(() => store.state.storageUser.getSessionNavTabrsType, (newer, older) => {
      if (newer === null) return
      else {
        console.log(`Watch vuex navType newer is：${newer}`)
      }
    }, { deep: true })
    
    onMounted(async () => {
    })

    // 暴露给外界组件使用
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
</style>
