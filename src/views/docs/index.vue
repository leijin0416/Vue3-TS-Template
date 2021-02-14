<template>
  <div class="router-view">
    <header>
      <van-nav-bar
        title="疫情信息"
        :border="false"
        fixed>
        <template #left>
          <van-icon name="arrow-left" size="18" color="#fe4f70" @click="onClickLeft" />
        </template>
      </van-nav-bar>
      <div class="v-title-top">
        <div class="weui-flex">
          <div class="weui-flex-bd" 
            v-for="item in titleTopData" 
            :key="item.id" 
            :class="titleTopId === item.id ? 'v-active' : ''"
            @click="onTitleTopClick(item.id)">{{item.name}}</div>
        </div>
      </div>
    </header>
    <main>
      <TimelineService />
    </main>
    <main>
      <div class="v-search-box">
        <van-search
          v-model="searchValue"
          show-action
          placeholder="请输入搜索省份,如湖南"
          @search="onClickSearch"
        >
          <template #action>
            <div @click="onClickSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="v-pestilence-mian">
        <div class="v-pestilence-header">
          <div class="weui-flex">
            <div class="weui-flex-hd">
              <p>{{provinceName}}</p>
            </div>
            <div class="weui-flex-bd">
              <p>{{currentConfirmedCount}}</p>
              <p>现存确诊</p>
            </div>
            <div class="weui-flex-bd">
              <p>{{confirmedCount}}</p>
              <p>累计确诊</p>
            </div>
            <div class="weui-flex-bd">
              <p>{{deadCount}}</p>
              <p>累计死亡</p>
            </div>
          </div>
        </div>
        <div class="v-pestilence-title">
          <div class="weui-flex">
            <div class="weui-flex-bd">地区</div>
            <div class="weui-flex-bd">现存确诊</div>
            <div class="weui-flex-bd">累计确诊</div>
            <div class="weui-flex-bd">死亡</div>
            <div class="weui-flex-bd">治愈</div>
          </div>
        </div>
        <div class="v-pestilence-list">
          <div class="weui-flex" v-for="(item, index) in citiesData" :key="item.index">
            <div class="weui-flex-bd">{{item.cityName}}</div>
            <div class="weui-flex-bd">{{item.currentConfirmedCount}}</div>
            <div class="weui-flex-bd">{{item.confirmedCount}}</div>
            <div class="weui-flex-bd">{{item.deadCount}}</div>
            <div class="weui-flex-bd">{{item.curedCount}}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onMounted, defineAsyncComponent, getCurrentInstance } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"

const TimelineService = defineAsyncComponent(() => import('./TimelineService.vue'))

export default {
  components: {
    TimelineService,
  },
  setup() {
    // 获取当前组件实例,this
    const { ctx } = getCurrentInstance()
    // 路由
    const router = useRouter()
    // 获取路由信息
    const route = useRoute()
    // 状态管理vuex
    const store = useStore()
    const vuexStoreDocs = store.state.vuexStorageDocs

    const stateData = reactive({
      titleTopId: 2,
      titleTopData: [
        {
          id: 1,
          name: '实时资讯',
        },
        {
          id: 2,
          name: '各地疫情',
        },
        {
          id: 3,
          name: '辟谣专区',
        },
        {
          id: 4,
          name: '疫情科普',
        },
      ],
      searchValue: '',
      citiesData: [],
      confirmedCount: '',  // 累计
      curedCount: '',      // 治愈
      deadCount: '',       // 死亡
      currentConfirmedCount: '', // 现存
      provinceName: '',
    })
    
    // 捕获省份信息
    watch( () => vuexStoreDocs.getSessionDocsAreaStat, (newVal, oldVal) => {
        if (newVal !== []) {
          let {cities, confirmedCount, curedCount, deadCount, currentConfirmedCount, provinceName} = newVal
          stateData.citiesData = cities
          stateData.confirmedCount = confirmedCount
          stateData.curedCount = curedCount
          stateData.deadCount = deadCount
          stateData.currentConfirmedCount = currentConfirmedCount
          stateData.provinceName = provinceName
        }
        // console.log(newVal);
        // console.log(oldVal);
      }
    )

    onMounted(() => {
      // dispatch：含有异步操作方法
      if (stateData.citiesData.length === 0) store.dispatch('vuexStorageDocs/updateDocsAreaStat', '湖南')
      store.dispatch('vuexStorageDocs/updateDocsTimelineService')
    })

    const onTitleTopClick = (id) => {
      stateData.titleTopId = id
    }

    const onClickSearch = () => {
      let value = stateData.searchValue
      store.dispatch('vuexStorageDocs/updateDocsAreaStat', value)
      // console.log(value);
      ctx.$toast({
        duration: 3000,
        message: '查询成功',
        onClose: () => {}
      })
    }

    const onClickLeft = () => {
      router.go(-1)
    }

    return {
      ...toRefs(stateData),
      onClickSearch,
      onClickLeft,
      onTitleTopClick,
    }
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  box-sizing: border-box;
  height: 100vh;
  padding-top: 84px;
  background-color: #f9f9f9;
}

.v-title-top {
  padding: 0 10px;
  background-color: #fff;
  .weui-flex-bd {
    box-sizing: border-box;
    padding: 30px 10px;
    font-size: 28px;
    text-align: center;
  }
  .v-active {
    position: relative;
    font-weight: bold;
    color: #fe4f70;
    &::before {
      content: ' ';
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 44px;
      height: 8px;
      border-radius: 100px;
      background-color: #fe4f70;
      transform: translateX(-50%);
    }
  }
}

.v-search-box {
  padding: 20px 16px 20px 6px;
  margin-top: 20px;
  background-color: #fff;
}

.v-pestilence-mian {
  padding: 0 30px 30px;
  background-color: #fff;
  .v-pestilence-header {
    padding: 20px 0 40px;
    .weui-flex-bd {
      font-size: 24px;
      text-align: center;
      border-right: 2px solid #f9f9f9;
      color: #555;
      p:nth-child(1) {
        padding-bottom: 10px;
        font-size: 44px;
        font-weight: bold;
      }
      &:nth-child(2) {
        p:nth-child(1) {
          color: #fe4f70;
        }
      }
      &:nth-child(3) {
        p:nth-child(1) {
          color: #e02634;
        }
      }
      &:nth-child(4) {
        border-right: none;
        p:nth-child(1) {
          color: #5d7092;
        }
      }
    }
  }
  .v-pestilence-title {
    text-align: center;
    .weui-flex-bd {
      padding: 20px 0;
      font-weight: bold;
      border-left: 2px solid #fff;
      background-color: #e3e7f3;
      &:nth-child(1) {border-left: none;}
      &:nth-child(2) {background-color: #ff9351;}
      &:nth-child(3) {background-color: #f3bab0;}
      &:nth-child(4) {background-color: #b4c0d5;}
      &:nth-child(5) {background-color:#95db9a;}
    }
  }
  .v-pestilence-list {
    background-color: #f7f7f7;
    .weui-flex-bd {
      padding: 16px 8px;
      text-align: right;
      border-left: 2px solid #fff;
      &:nth-child(1) {
        text-align: left;
        border-left: none;
      }
    }
  }
}

</style>