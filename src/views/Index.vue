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
                <img :src="item.goodsCoverImg" alt="tabs.png" class="v-img">
              </div>
              <div class="v-title">{{item.goodsName}}</div>
              <div class="v-price">
                <p>￥ <span>{{item.sellingPrice}}</span></p>
                <p class="v-icon"><van-icon name="cart-o" color="#d8182d" size="24" /></p>
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
          <van-col span="12" v-for="item in newProducts" :key="item.goodsId">
            <div class="v-info">
              <div class="v-img-box">
                <img :src="item.goodsCoverImg" alt="tabs.png" class="v-img">
              </div>
              <div class="v-title">{{item.goodsName}}</div>
              <div class="v-price">
                <p>￥ <span>{{item.sellingPrice}}</span></p>
                <p class="v-icon"><van-icon name="cart-o" color="#d8182d" size="24" /></p>
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
      newProducts: [],
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
      const { carousels, newGoodses } = data.data;
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
      state.newProducts = newGoodses
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
  padding: 15px 0 4px;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  .v-radius {
    position: relative;
    display: inline-block;
    transform: scale(0.4);
    span {
      display: block;
      &:nth-child(1), &:nth-child(2) {
        width: 40px;
        height: 20px;
        border-radius: 0 0 100px 100px;
      }
      &:nth-child(3), &:nth-child(4) {
        z-index: 999;
        position: absolute;
        top: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color:  red;
      }
      &:nth-child(1) {
        background-color: red;
      }
      &:nth-child(2) {
        z-index: 99;
        position: absolute;
        left: 0;
        top: -4px;
        transform: scale(0.9);
        background-color: #f9f9f9;
      }
      &:nth-child(3) {
        left: -2px;
      }
      &:nth-child(4) {
        right: -2px;
      }
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
      font-size: 12px;
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
  .v-list-box {
    padding: 0 5px;
  }
  .v-info {
    padding: 10px;
    margin: 5px;
    font-size: 12px;
    border-radius: 5px;
    background-color: #fff;
    .v-img-box {
      line-height: 1;
      .v-img {
        display: block;
        width: 80%;
        margin: 0 auto;
      }
    }
    .v-title {
      padding: 10px 0 5px;
    }
    .v-price {
      position: relative;
      padding: 10px 0;
      color:#d8182d;
      span {
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
      }
      .v-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>