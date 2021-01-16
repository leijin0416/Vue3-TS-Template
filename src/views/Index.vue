<template>
  <div class="router-view">
    <!-- 轮播 -->
    <div class="v-swiper-main">
      <van-swipe class="v-swiper" :autoplay="3000" indicator-color="#fe4f70">
        <van-swipe-item v-for="item in swiperList" :key="item.id">
          <img :src="item.image" class="v-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 宫格 -->
    <div class="v-flex-main">
      <div class="v-flex-list" v-for="item in categoryList" :key="item.id">
        <div class="v-text-box">
          <img :src="item.image" alt="banner.png" class="v-img">
          <p class="v-text">{{item.text}}</p>
        </div>
      </div>
    </div>
    <h2 class="v-title-min">新品上线<span></span></h2>
    <div class="v-content-tabs">
    所有的学习，最开始都像是在照镜子，无非是学到了，再换一个老师，换一面镜子，直到有一天你发现，你的新的镜子里是你自己，你就有你自己的方法了，你就可以做别人的镜子了
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRef, onMounted, computed, toRefs, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import { webGetSelectAreaCode } from "@/mock/newbee"
import { sessionData } from "@/filters/storage"

export default {
  name: '',
  props: {},
  setup(props:any, context:any) {
    // console.log(props.navTabsData[0].label)
    // ctx.emit('event')
    const router = useRouter()   // 路由
    // 获取路由信息
    const route = useRoute()
    // 状态管理vuex
    const store = useStore()

    const state = reactive({
      id: 1,
      swiperList: [],
      categoryList: [
        {
          id: 1,
          text: '永诚超市',
          image: require('@assets/images/banner_center1.png')
        },
        {
          id: 2,
          text: '品牌服饰',
          image: require('@assets/images/banner_center2.png')
        },
        {
          id: 3,
          text: '全球购',
          image: require('@assets/images/banner_center3.png')
        },
        {
          id: 4,
          text: '永诚生鲜',
          image: require('@assets/images/banner_center4.png')
        },
        {
          id: 5,
          text: '永诚到家',
          image: require('@assets/images/banner_center5.png')
        },
        {
          id: 6,
          text: '充值缴费',
          image: require('@assets/images/banner_center6.png')
        },
        {
          id: 7,
          text: '9.9元拼',
          image: require('@assets/images/banner_center7.png')
        },
        {
          id: 8,
          text: '领券',
          image: require('@assets/images/banner_center8.png')
        },
        {
          id: 9,
          text: '省钱',
          image: require('@assets/images/banner_center9.png')
        },
        {
          id: 10,
          text: '全部',
          image: require('@assets/images/banner_center10.png')
        }
      ],
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

    /**
     *  异步加载数据
     */
    onMounted(async () => {
      const { data }:any = await webGetSelectAreaCode({})
      const { carousels } = data.data;
      if (!data) {
        state.swiperList = []
        return
      }
      state.swiperList = carousels.map( (item: any, i: any) => {
        return {
          id: i,
          image: item.carouselUrl,
        }
      })
      console.log(data);
    })

    /**
     *  异步加载数据
     */
    const getInTheatersData = async () => {}

    return {
      ...toRefs(state),
      active,
      getInTheatersData
    }
  }
}
</script>

<style lang="scss" scoped>
.v-title-min {
  padding: 15px 0;
  font-size: 16px;
  text-align: center;
  span {
    position: relative;
    display: block;
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background-color: red;
    &::before {
      contain: ' ';
      position: absolute;
      bottom: 0;
      left: 50%;
      display: block;
      width: 10px;
      height: 10px;
      background-color: red;
      transform: translateX(-50%);
    }
  }
}
.v-swiper-main {
  min-height: 167px;
  line-height: 1;
  background-color: #fff;
  /deep/.van-swipe .v-img {
    width: 100%;
  }
}
.v-flex-main {
  @include flex(row, wrap);
  @include align-item(center);  // 垂直Y
  padding: 4px 0;
  background-color: #fff;
  .v-flex-list {
    width: 20%;
    margin: 10px 0;
    .v-text-box {
      font-size: 14px;
      line-height: 1;
      text-align: center;
      .v-img {
        display: block;
        width: 40px;
        margin: 0 auto 8px;
      }
      .v-text {
        color: #86807c;
      }
    }
  }
}
.v-content-tabs {
  padding: 15px 10px;
  background-color: #fff;
}
</style>