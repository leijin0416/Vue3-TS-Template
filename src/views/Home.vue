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
    <p>所有的学习，最开始都像是在照镜子，无非是学到了，再换一个老师，换一面镜子，直到有一天你发现，你的新的镜子里是你自己，你就有你自己的方法了，你就可以做别人的镜子了</p>
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
      // dispatch：含有异步操作
      store.dispatch("vuexStorageNav/updateTokenCart", 123)
    })

    // vuex
    const testStatus = computed(() => {
      return ctx.$store.state.getSessionUserToken
    })

    const vuexCommit = () => {
      // commit：同步操作
      ctx.$store.commit('vuexStorageNav/updateTokenCart', testStatus.value + 1)
    }

    // vue-router
    const routerName = computed(() => {
      return ctx.$router.currentRoute.value.name
    })

    return {
      ...toRefs(stateData),
    }
  }
}
</script>

<style lang="scss" scoped>
.v-header-user {
  padding: 30px;
  background-color: red;
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
    font-weight: bold;
    color: #fff;
  }
}
</style>