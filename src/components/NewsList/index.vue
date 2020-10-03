<template>
  <div class="components">
    <div class="v-tabs">
      <van-tabs
        title-active-color="#fff"
        title-inactive-color="#fff"
        color="#fff"
        background="#f92222">
        <van-tab 
          v-for="index in vanTabData" 
          :title="index" >
          内容: {{ index }}
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, computed, toRefs, watch } from "vue"
import { useStore } from "vuex"
import { sessionData } from "@/filters/storage"
import { webGetInewNewsPages, webGetInewNewsChannel } from "@/mock/index"


export default {
  components: {
  },
  setup() {
    const store = useStore() // 声明、获取 状态管理vuex
    const num = ref(0)
    const state = reactive({
      channel: "头条",
      start: 1,
      vanTabData: [],
    })
    
    onMounted(async () => {
      getInTheNewsData()
    })
    
    /**
     *  异步加载数据
     */
    const getInTheNewsData = async () => {
      let { channel, start } = state
      // 在引用一些 js 所写的第三方库时，或者开发时还不情况当前变量的具体类型时，都可以用any类型的变量
      let headerTitleData: any  = await webGetInewNewsChannel({
        appkey: "ca05a06b9221f5d1"
      })
      const newsListData = await webGetInewNewsPages({
        channel: channel,
        start: start,
        num: 30,
        appkey: "ca05a06b9221f5d1"
      })
      state.vanTabData = headerTitleData.data.result
      console.log(newsListData)
    }

    // 暴露给外界组件使用
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.v-tabs {
  /deep/.van-tabs__line {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    background-color: transparent !important;
  }
}
</style>
