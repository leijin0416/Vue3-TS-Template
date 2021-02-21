<template>
  <div class="router-view">
    <!-- 轮播 -->
    <div class="v-swiper-main">
      <van-swipe class="v-swiper" :autoplay="3000" indicator-color="#fe4f70">
        <van-swipe-item v-for="item in swiperList" :key="item.id">
          <img class="v-img" v-lazy="item.image" >
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
    <!-- 内容 -->
    <h2 class="v-title-min">
      <p>新品上线</p>
      <p class="v-radius">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </h2>
    <div class="v-content-tabs">
      <div class="v-list-box">
        <van-row>
          <van-col span="12" v-for="item in newProducts" :key="item.goodsId">
            <div class="v-info">
              <div class="v-img-box">
                <img alt="tabs.png" class="v-img" v-lazy="item.goodsCoverImg" >
              </div>
              <div class="v-title">{{item.goodsName}}</div>
              <div class="v-price">
                <p>￥<span>{{item.sellingPrice}}</span>.00</p>
                <p class="v-icon"><van-icon name="cart-o" color="#fff" size="18" /></p>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <h2 class="v-title-min">
      <p>热门商品</p>
      <p class="v-radius">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </h2>
    <div class="v-content-tabs">
      <div class="v-list-box">
        <van-row>
          <van-col span="12" v-for="item in hotRecommend" :key="item.goodsId">
            <div class="v-info">
              <div class="v-img-box">
                <img :src="item.goodsCoverImg" alt="tabs.png" class="v-img" >
              </div>
              <div class="v-title">{{item.goodsName}}</div>
              <div class="v-price">
                <p>￥<span>{{item.sellingPrice}}</span>.00</p>
                <p class="v-icon"><van-icon name="cart-o" color="#fff" size="18" /></p>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <h2 class="v-title-min">
      <p>新品推荐</p>
      <p class="v-radius">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </h2>
    <div class="v-content-tabs">
      <div class="v-list-box">
        <van-row>
          <van-col span="12" v-for="item in newsRecommend" :key="item.goodsId">
            <div class="v-info">
              <div class="v-img-box">
                <img :src="url + item.goodsCoverImg" alt="tabs.png" class="v-img" v-if="item.goodsId !== 10907">
                <img :src="item.goodsCoverImg" alt="tabs.png" class="v-img" v-else>
              </div>
              <div class="v-title">{{item.goodsName}}</div>
              <div class="v-price">
                <p>￥<span>{{item.sellingPrice}}</span>.00</p>
                <p class="v-icon"><van-icon name="cart-o" color="#fff" size="18" /></p>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRef, onMounted, computed, toRefs, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import { webGetSelectAreaCode } from "@/mock/newbee"
import { sessionData } from "@/filters/storage"

// console.log(props.navTabsData[0].label)
// ctx.emit('event')
export default {
  name: '',
  props: {},
  setup(props:any, context:any) {
    // 路由
    const router = useRouter()
    // 获取路由信息
    const route = useRoute()
    // 状态管理vuex
    const store = useStore()

    const state = reactive({
      id: 1,
      url: 'http://47.99.134.126:28019',
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
      newProducts: [],
      hotRecommend: [],
      newsRecommend: [],
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

    onMounted(() => {
      getInTheatersData()
    })

    /**
     *  异步加载数据
     */
    const getInTheatersData = async () => {
      const { data }:any = await webGetSelectAreaCode({})
      const { carousels, newGoodses, hotGoodses, recommendGoodses } = data.data;
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
      hotGoodses.forEach( (item: any, i: any) => {
        if (item.goodsId == 10902) return
        else item.goodsCoverImg = state.url + item.goodsCoverImg
      })
      state.newProducts = newGoodses
      state.hotRecommend = hotGoodses
      state.newsRecommend = recommendGoodses
      // console.log(hotGoodses);
    }

    return {
      ...toRefs(state),
      active,
      getInTheatersData
    }
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  padding-bottom: 110px;
  background-color: #f9f9f9;
}
.v-title-min {
  padding: 30px 0 10px;
  font-size: 28px;
  line-height: 1;
  text-align: center;
  p {
    z-index: 999;
    position: relative;
  }
  .v-radius {
    z-index: 99;
    position: relative;
    display: inline-block;
    transform: scale(0.5);
    span {
      display: block;
      &:nth-child(1), &:nth-child(2) {
        width: 80px;
        height: 40px;
        border-radius: 0 0 100px 100px;
      }
      &:nth-child(3), &:nth-child(4) {
        z-index: 99;
        position: absolute;
        top: -2px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color:  red;
      }
      &:nth-child(1) {
        background-color: red;
      }
      &:nth-child(2) {
        z-index: 1;
        position: absolute;
        left: 0;
        top: -40px;
        height: 80px;
        border-radius: 50%;
        transform: scale(0.8);
        background-color: #f9f9f9;
      }
      &:nth-child(3) {
        left: -1px;
      }
      &:nth-child(4) {
        right: -1px;
      }
    }
  }
}
.v-swiper-main {
  height: 340px;
  overflow: hidden;
  line-height: 1;
  /deep/.van-swipe .v-img {
    width: 100%;
    height: 340px;
    object-fit: cover;
  }
}
.v-flex-main {
  @include flex(row, wrap);
  @include align-item(center);  // 垂直Y
  padding: 10px 0;
  background-color: #fff;
  .v-flex-list {
    width: 20%;
    margin: 20px 0;
    .v-text-box {
      line-height: 1;
      text-align: center;
      .v-img {
        display: block;
        width: 70px;
        margin: 0 auto 20px;
      }
      .v-text {
        font-size: 24px;
        color: #86807c;
      }
    }
  }
}
.v-content-tabs {
  min-height: 600px;
  .v-list-box {
    padding: 0 10px;
  }
  .v-info {
    padding: 20px;
    margin: 10px;
    font-size: 28px;
    border-radius: 10px;
    background-color: #fff;
    .v-img-box {
      line-height: 1;
      .v-img {
        display: block;
        width: 80%;
        height: 260px;
        margin: 0 auto;
      }
    }
    .v-title {
      box-sizing: border-box;
      min-height: 110px;
      padding: 20px 0 10px;
    }
    .v-price {
      position: relative;
      padding: 10px 0;
      font-weight: bold;
      color:#d8182d;
      span {
        display: inline-block;
        font-size: 38px;
      }
      .v-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        /deep/.van-icon {
          padding: 10px;
          border-radius: 50%;
          background-color: #d8182d;
        }
      }
    }
  }
}
</style>