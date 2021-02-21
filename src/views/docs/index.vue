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

    <!-- 实时资讯 -->
    <main class="item-content" :ref="myRefOne">
      <TimelineService :timeLineService="timeLineService"/>
    </main>

    <!-- 各地疫情 -->
    <main class="item-content" :ref="myRefTwo">
      <h3 class="v-h3-title">各地疫情</h3>
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

    <!-- 实时资讯 -->
    <main class="item-content" :ref="myRefThree">
      <RumorList :rumorListData="rumorListData"/>
    </main>

  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onMounted, defineAsyncComponent, getCurrentInstance, onUnmounted, onActivated } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import { ParseTime } from "@/filters/common"

const TimelineService = defineAsyncComponent(() => import('./TimelineService.vue'))
const RumorList = defineAsyncComponent(() => import('./RumorList.vue'))

export default {
  components: {
    TimelineService,
    RumorList,
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
      headerFixed: '',
      arrScrollDom: '',
      titleTopId: 1,
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
      timeLineService: [],
      rumorListData: [],
    })

    // 最新新闻
    watch( () => vuexStoreDocs.getSessionDocsTimelineService, (newVal, oldVal) => {
      if (newVal !== []) {
        let info = [];
        for (let i = 0; i < 15; i++) {
          newVal[i].pubDate = ParseTime(newVal[i].pubDate)
          info.push(newVal[i])
          // console.log();
        }
        stateData.timeLineService = info
      }
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
    })

    // 辟谣专区
    watch( () => vuexStoreDocs.getSessionDocsIndexRumorList, (newVal, oldVal) => {
      if (newVal !== []) {
        stateData.rumorListData = newVal
      }
    })

    onMounted(() => {
      // dispatch：含有异步操作方法
      if (stateData.timeLineService.length === 0) store.dispatch('vuexStorageDocs/updateDocsTimelineService')
      if (stateData.citiesData.length === 0) store.dispatch('vuexStorageDocs/updateDocsAreaStat', '湖南')
      if (stateData.citiesData.length === 0) store.dispatch('vuexStorageDocs/updateDocsIndexRumorList')
      
      // 获取长度列表
      stateData.arrScrollDom = document.getElementsByClassName("item-content");
      window.addEventListener('scroll', handleScroll);
    })

    // keep-alive 缓存刷新  -生命周期
    onActivated(() => {
      // if (stateData.timeLineService.length !== 0) store.dispatch('vuexStorageDocs/updateDocsTimelineService')
      // if (stateData.citiesData.length !== 0) store.dispatch('vuexStorageDocs/updateDocsAreaStat', '湖南')
      // if (stateData.citiesData.length !== 0) store.dispatch('vuexStorageDocs/updateDocsIndexRumorList')
    })

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

    // 获取dom元素 ref，setRefOne -获取后的值
    let setRefOne = ''
    let setRefTwo = ''
    let setRefThree = ''
    const myRefOne = el => { setRefOne = el }
    const myRefTwo = el => { setRefTwo = el }
    const myRefThree = el => { setRefThree = el }

    // 标题TAB点击-获取滚动条位置
    const onTitleTopClick = (id) => {
      let dom
      if (id == 1) dom = ctx.$refs.myRefOne.offsetTop
      else if (id == 2) dom = ctx.$refs.myRefTwo.offsetTop
      else if (id == 3) dom = ctx.$refs.myRefThree.offsetTop
      else dom = null
      window.scrollTo(0, dom)    // 滚动条位置
      stateData.titleTopId = id
      // console.log(dom);
    }

    // 标题TAB滚动条位置
    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 获取长度
      let arrScrollDomLength = stateData.arrScrollDom.length
      stateData.headerFixed = scrollTop > ctx.offsetTop

      for (let i = 0; i < arrScrollDomLength; i++) {
        // 因为下面使用到了i+1，所以需要把最后一个分离出来判断
        if (stateData.arrScrollDom[arrScrollDomLength-1].offsetTop-scrollTop > 80) {
          if (stateData.arrScrollDom[i].offsetTop-scrollTop <= 80 && stateData.arrScrollDom[i+1].offsetTop-scrollTop > 80) {
            stateData.titleTopId = i + 1
          }
        } else {
          stateData.titleTopId = arrScrollDomLength
        }
      }
    }

    const onClickLeft = () => { router.go(-1) }

    // 页面销毁
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    })

    return {
      ...toRefs(stateData),
      myRefOne,
      myRefTwo,
      myRefThree,
      onClickSearch,
      onClickLeft,
      onTitleTopClick,
      handleScroll,
    }
  },
}
</script>

<style lang="scss" scoped>
.router-view {
  box-sizing: border-box;
  height: auto;
  padding: 84px 30px 30px;
  background-color: #f9f9f9;
  .v-h3-title {
    padding: 30px 30px 10px;
    background-color: #fff;
  }
}

.v-title-top {
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
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