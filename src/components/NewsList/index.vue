<template>
  <div class="components">
    <div class="v-tabs">
      <van-tabs
        @click="onTabEventsClick"
        title-active-color="#fff"
        title-inactive-color="#fff"
        color="#fff"
        background="#f92222">
        <van-tab
          v-for="index in vanTabData" 
          :title="index" >
          <div class="v-news-box">
            <div class="v-news-list" 
              v-for="(item, index) in newsListData" :key="index" >
              <div class="weui-flex">
                <div class="weui-cell-bd">
                  <h4 class="v-title ellipsis-sm">{{ item.title }}</h4>
                  <div class="v-text">
                    <p>来源: {{ item.src }}</p>
                    <p>时间: {{ item.time }}</p>
                  </div>
                </div>
                <div class="weui-cell-ft">
                  <div class="v-img-box">
                    <img :src="item.pic" alt="newlist.png" class="v-img">
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      newsListData: [],
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
      let newsListData: any = await webGetInewNewsPages({
        channel: channel,
        start: start,
        num: 30,
        appkey: "ca05a06b9221f5d1"
      })
      state.vanTabData = headerTitleData.data.result
      state.newsListData = newsListData.data.result.list
      console.log(newsListData)
    }

    const onTabEventsClick = (name: number, title: string) => {
      state.newsListData.length = 0
      state.channel = title
      getInTheNewsData()
    }

    // 暴露给外界组件使用
    return {
      ...toRefs(state),
      onTabEventsClick,
    }
  },
}
</script>

<style lang="scss">
.ellipsis-sm { display:-webkit-box;  -webkit-line-clamp:2;  -webkit-box-orient: vertical;  overflow:hidden; text-overflow:ellipsis;}
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
.v-news-box {
  padding: 15px;
  .v-news-list {
    padding: 15px 0;
    font-size: 12px;
    border-top: 1px solid #f1f1f1;
    &:nth-child(1) {border-top: none;}
    .weui-flex {
      display: flex;
      align-items: flex-start;
      word-break: break-all;
      overflow-wrap: break-word;
      word-wrap: break-word; //兼容IE
      overflow: hidden;
      .weui-cell-bd {
        flex: 1;
      }
      .weui-cell-ft {
        display: inline-block;
      }
    }
    .v-title {
      font-size: 16px;
    }
    .v-text {
      padding-top: 10px;
      line-height: 1.5;
      color: #666;
    }
    .v-img-box {
      display: block;
      box-sizing: border-box;
      width: 150px;
      padding-left: 15px;
      .v-img {width: 100%;}
    }
  }
}
</style>
