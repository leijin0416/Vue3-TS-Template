<template>
  <div class="router-view">
    <header>
      <div class="v-header-user">
        <div class="weui-flex">
          <div class="weui-cell-hd">
            <img src="@assets/images/avatar.jpg" alt="user.png" class="v-img" />
          </div>
          <div class="weui-cell-bd">
            <p class="v-text">{{userName}}</p>
          </div>
        </div>
      </div>
    </header>
    <div class="v-introduce-text" ref="introduce" :class="introduceType ? 'v-appear' : 'v-disappear'">
      <p class="v-text"><van-icon name="chat-o" /> 所有的学习，最开始都像是在照镜子，无非是学到了，再换一个老师，换一面镜子，直到有一天你发现，你的新的镜子里是你自己，你就有你自己的方法了，你就可以做别人的镜子了。</p>
      <div class="v-icon-box" @click="onClickIntroduce">
        <van-icon name="close" size="18" color="#999999" />
      </div>
    </div>
    <main>
      <div class="v-cell-box">
        <van-cell title="个人信息" icon="contact" to="/home/modify" is-link />
        <van-cell title="疫情信息" icon="volume-o" is-link />
        <van-cell title="分享海报" icon="share-o" is-link />
        <van-cell title="帮助中心" icon="question-o" is-link />
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"

export default {
  setup() {
    // 获取当前组件实例,this
    const { ctx } = getCurrentInstance()
    // 状态管理vuex
    const store = useStore()
    const vuexStoreNav = store.state.vuexStorageNav
    const count = ref(0)
    const stateData = reactive({
      introduceType: true,
      userName: 'vue-Cropper-h5 图片裁剪',
    })
    
    watch( () => vuexStoreNav.getSessionUserToken, (newVal, oldVal) => {
        console.log(newVal);
        console.log(oldVal);
      }
    )

    const otherTwoCount = computed(() => {
    })

    onMounted(() => {
      let name = vuexStoreNav.getSessionUserToken
      if (name !== '') stateData.userName = vuexStoreNav.getSessionUserToken
      // console.log(vuexStoreNav.getSessionUserToken);
    })

    const vuexCommit = () => {
      // commit：同步操作
      ctx.$store.commit('vuexStorageNav/SET_sessionUserToken', testStatus.value + 1)
    }

    // vuex
    const testStatus = computed(() => {
      return ctx.$store.state.getSessionUserToken
    })
    // vue-router
    const routerName = computed(() => {
      return ctx.$router.currentRoute.value.name
    })

    const onClickIntroduce = () => {
      stateData.introduceType = false;
      setTimeout(() => {
        ctx.$refs.introduce.style = "display: none"
      }, 1000);
    }

    return {
      ...toRefs(stateData),
      onClickIntroduce
    }
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  box-sizing: border-box;
  height: 100vh;
  padding-bottom: 110px;
  background-color: #f9f9f9;
}

.v-introduce-text {
  position: relative;
  padding: 0 30px;
  margin-bottom: 30px;
  // transition: all .3s linear;
  .v-text {
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 30px #eee;
    background-color: #fff;
  }
  .v-icon-box {
    position: absolute;
    right: 22px;
    top: -10px;
  }
}

.v-appear {
  // animation: dropactive .3s linear 1;
}
.v-disappear {
  animation: dropdown 1.2s linear 1;
}

@keyframes dropdown {
  0% { transform: scale(1); }
  50% { transform: scale(0.6); }
  60% { transform: scale(0.3); }
  95% { transform: scale(0); }
  // 100% { visibility: hidden; opacity: 0;height: 0; }
}

@keyframes dropactive {
  0% { transform: scale(0); }
  30% { transform: scale(0.3); }
  60% { transform: scale(0.6); }
  90% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.v-header-user {
  padding: 30px;
  margin-bottom: 30px;
  background-color: #fb395d;
  .weui-cell-hd {
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 50%;
    .v-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .v-text {
    padding-left: 30px;
    font-size: 36px;
    color: #fff;
  }
}

.v-cell-box {
  padding: 30px 0;
  background-color: #fff;
  /deep/.van-cell {
    line-height: 50px;
    .van-cell__left-icon, .van-cell__right-icon {
      height: 48px;
      line-height: 48px;
    }
    .van-cell__left-icon {
      width: 48px;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      background-color: #ffbf44;
    }
    .van-cell__title {
      margin-left: 10px;
    }
    &:nth-child(2) {
      .van-cell__left-icon {
        background-color: #c67cff;
      }
    }
    &:nth-child(3) {
      .van-cell__left-icon {
        background-color: #ff9351;
      }
    }
    &:nth-child(4) {
      .van-cell__left-icon {
        background-color: #fe4f70;
      }
    }
  }
}
</style>