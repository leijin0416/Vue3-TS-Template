<template>
  <!-- 分享海报 -->
  <div class="v-share">
    <!-- 背景盒子 -->
    <div ref="box" class="v-share-box" :class="qrCanvasImgUrl ? 'v-show' : ''">
      <div class="v-flex" :style="{ height: fullHeightAuto }">
        <div class="v-flex-bd">
          <img
            class="v-img-box"
            src="@/assets/images/i_share_bg.png"
            alt="logo.png"
          />
        </div>
      </div>
      <div class="v-share-code">
        <div class="v-qrcode-box">
          <div class="v-qrcode" id="qrCodesUrl"></div>
        </div>
      </div>
    </div>
    <!-- 海报盒子 -遮罩层 -->
    <img
      :src="qrCanvasImgUrl"
      ref="imgBg"
      alt="share_bg"
      class="v-share-top"
      v-if="qrCanvasImgUrl"
    />
  </div>
</template>

<script>
import html2canvas from "html2canvas"
import { qrcanvas } from "qrcanvas"
import "./html2canvas.js"

import { ref, reactive, toRefs, watch, onMounted, computed, getCurrentInstance } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"

export default {
  components: {},
  props: {},
  setup(props, ctxs) {
    const { ctx } = getCurrentInstance()
    // 路由
    const router = useRouter()
    // 获取路由信息
    const route = useRoute()
    // 状态管理vuex
    const store = useStore()

    const stateData = reactive({
      fullHeightAuto: "auto",    // 计算处理手机高度
      localeName: "zh_CN",
      qrCanvasImgUrl: "",        // 截图海报
      qrCodeUrl: "https://www.nai-tradingcenter.com",   // 二维码
    })

    watch( () => stateData.qrCanvasImgUrl, (newValue, oldValue) => {

    })

    onMounted(() => {
      drawQrCanvasUrl()
    })
    
    const drawQrCanvasUrl = async () => {
      // 生成二维码
      const canvas1 = qrcanvas({
        data: decodeURIComponent(stateData.qrCodeUrl),
        size: 90,
      })
      document.getElementById("qrCodesUrl").appendChild(canvas1)
      await setTimeout(() => {
        const shareContent = ctx.$refs.box
        // console.log(shareContent.offsetHeight);
        const width = shareContent.offsetWidth
        const height = shareContent.offsetHeight
        const canvas = document.createElement("canvas")
        const scale = 2
          canvas.width = width * scale
          canvas.height = height * scale
          canvas.style.width = width / 2 + "px"
          canvas.style.height = height / 2 + "px"
          canvas.getContext("2d").scale(scale, scale)

        const opts = {
          scale: scale / 2, // 添加的scale 参数
          useCORS: true,
          canvas: canvas,
          dpi: 1000,
        };

        html2canvas(shareContent, opts).then(function (canvas) {
          const dataUrl = canvas.toDataURL()
          stateData.qrCanvasImgUrl = dataUrl
        });
      }, 500)
    }

    return {
      ...toRefs(stateData),
    }
  }
}

</script>

<style lang="scss" scoped>
.v-show {display: none;}
.v-share {
  position: relative;
  // 背景盒子
  .v-share-box {
    z-index: 1;
    position: relative;
    .v-flex {
      display: flex;
      flex-direction: column;
      .v-flex-bd {
        flex: 1;
        overflow: hidden;
        .v-img-box {
          width: 100%;
          vertical-align: top;
          line-height: 0;
        }
      }
    }
    .v-share-code {
      z-index: 9999;
      position: absolute;
      right: 0;
      bottom: 6%;
      display: block;
      width: 100%;
      text-align: right;
      .v-qrcode-box {
        display: inline-block;
        min-height: 140px;
        margin-right: 48px;
        .v-qrcode {
          line-height: 0;
          border: 10px solid #fff;
        }
      }
      .v-text-box {
        padding-top: 30px;
        font-size: 20px;
      }
    }
  }
  // 海报盒子
  .v-share-top {
    z-index: 9999;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    line-height: 1;
  }
}

@media only screen and (max-width: 370px) {
}
</style>