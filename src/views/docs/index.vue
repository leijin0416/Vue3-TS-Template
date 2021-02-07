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
      <div class="v-text-top">
        <div class="weui-flex">
          <div class="weui-flex-bd">实时资讯</div>
          <div class="weui-flex-bd">疫情地图</div>
          <div class="weui-flex-bd">辟谣专区</div>
          <div class="weui-flex-bd">疫情科普</div>
        </div>
      </div>
    </header>
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
    </main>
    <main>
      <div class="v-pestilence-mian">
        <div class="v-pestilence-header">
          <div class="weui-flex">
            <div class="weui-flex-bd">地区</div>
            <div class="weui-flex-bd">现存确诊</div>
            <div class="weui-flex-bd">累计确诊</div>
            <div class="weui-flex-bd">死亡</div>
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
import { ref, reactive, toRefs, watch, computed, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"

export default {
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
      searchValue: '',
      citiesData: [],
      confirmedCount: '',  // 累计
      curedCount: '',      // 治愈
      deadCount: '',       // 死亡
      currentConfirmedCount: '', // 现存
      provinceName: '',
    })
    
    watch( () => vuexStoreDocs.getSessionDocsAreaStat, (newVal, oldVal) => {
        if (newVal !== []) {
          let {cities} = newVal
          stateData.citiesData = cities
        }
        console.log(newVal);
        // console.log(oldVal);
      }
    )

    onMounted(() => {
      // dispatch：含有异步操作方法
      if (stateData.citiesData.length === 0) store.dispatch('vuexStorageDocs/updateDocsAreaStat', '湖南')
    })

    const onClickSearch = () => {
      let value = stateData.searchValue
      store.dispatch('vuexStorageDocs/updateDocsAreaStat', value)
      console.log(value);
      ctx.$toast({
        duration: 3000,
        message: '查询成功!',
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
    }
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  box-sizing: border-box;
  height: 100vh;
  padding-top: 84px;
  background-color: #fff;
}

.v-search-box {
  padding: 30px 16px 20px 6px;
  background-color: #fff;
}

.v-pestilence-mian {
  padding: 0 30px 30px;
  .v-pestilence-title {
    text-align: center;
    .weui-flex-bd {
      padding: 20px 0;
      font-weight: bold;
      border-left: 2px solid #fff;
      background-color: #e3e7f3;
      &:nth-child(1) {border-left: none;}
      &:nth-child(2) {background-color: #f3bab0;}
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