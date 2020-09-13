<template>
  <div class="home">
    <div class="content">
      <div class="user-head">
        <div class="user-avatar">
          <img src="@assets/images/avatar.jpg" alt="" />
        </div>
        <div class="user-info">
          <div class="hello">Good morning!</div>
          <div class="name">Marin Ramsey</div>
          <p>vuex: {{activeIds}}</p>
        </div>
        <div class="message">
          <div class="message-box">
            <van-icon
              name="smile-comment-o"
              size="30"
              badge="9"
              color="#1989fa"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-bar">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">Home</van-tabbar-item>
        <van-tabbar-item icon="search">Find</van-tabbar-item>
        <van-tabbar-item icon="friends-o">Message</van-tabbar-item>
        <van-tabbar-item icon="setting-o">Setting</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, computed, toRefs, getCurrentInstance, watch } from "vue"
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { sessionData } from '@/filters/storage'
import { webGetInewNewsPages, webGetInewNewsChannel } from "@/mock/index"

export default {
  setup() {
    const router = useRouter()   // 获取路由
    const route = useRoute()   // 获取路由
    const store = useStore()  // 状态管理vuex

    const counts = ref(0)
    const countId = ref(0)
    const state = reactive({
      active: 0,
      ids: '01',
      activeIds: '02',
    })
    
    /**
     *  监听vuex
     */
    watch(() => state.activeIds,
      (newer, older) => {
        /* ... */
        console.log(`新的count${newer}----旧的count${older}`)
      }, { deep: true })

    watch(() => store.state.storageUser.getSessionUserToken, (newer, older) => {
      if (newer == null) {
          return
      } else {
        // 监听 vuex 地址 getSessionUserToken
        state.activeIds = newer
        console.log(`count is ${newer}`)
      }
    }, { deep: true })

    onMounted(async () => {
      /**
       *  状态管理
       */
      state.activeIds = store.getters["storageUser/getSessionUserToken"]
      store.commit('storageUser/SET_sessionUserToken', 123)
      const data = sessionData("get", "getSessionUserToken", "")

      getInTheatersData()
    })
    const getInTheatersData = async () => {
      /**
       *  异步加载数据
       */
      const titleDataList = await webGetInewNewsChannel({
        appkey: "ca05a06b9221f5d1"
      })
      const newsDataList = await webGetInewNewsPages({
        channel: "头条",
        start: 1,
        num: 30,
        appkey: "ca05a06b9221f5d1"
      })
      console.log(titleDataList)
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
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .bottom-bar {
    height: 50px;
  }
  .content {
    flex: 1;
    overflow: auto;
    .user-head {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      .user-avatar {
        width: 80px;
        & > img {
          width: 70px;
          height: 70px;
          border: 1px solid #999;
          border-radius: 50%;
        }
      }
      .user-info {
        flex: 1;
        padding: 12px;
        .hello {
          color: #bfbfbf;
        }
        .name {
          margin-top: 8px;
          font-size: 24px;
          font-weight: bold;
        }
      }
      .message {
        width: 50px;
        display: flex;
        align-items: center;
        .message-box {
          height: 50px;
          width: 50px;
          display: flex;
          align-items: center;
          border-radius: 10px;
          text-align: center;
          justify-content: center;
          box-shadow: 1px 4px 25px rgba($color: #000000, $alpha: 0.15);
        }
      }
    }
  }
}
</style>
