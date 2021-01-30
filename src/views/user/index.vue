<template>
  <div class="router-view">
    <header>
      <div class="v-navbar-box">
        <van-nav-bar
          title="修改个人信息"
          :border="false"
          fixed>
          <template #left>
            <van-icon name="arrow-left" size="18" color="#fe4f70" @click="onClickLeft" />
          </template>
        </van-nav-bar>
      </div>
    </header>
    <main>
      <div class="v-form-box">
        <van-form @submit="onClickSubmit">
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名!' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码!' }]"
          />
          <div class="v-btn-box">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
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
    const vuexStoreNav = store.state.vuexStorageNav
    const count = ref(0)
    const stateData = reactive({
      username: '',
      password: '',
    })
    
    watch( () => vuexStoreNav.getSessionUserToken, (newVal, oldVal) => {
        // console.log(newVal);
        // console.log(oldVal);
      }
    )

    onMounted(() => {
    })

    // vuex
    const testStatus = computed(() => {
      return ctx.$store.state.getSessionUserToken
    })
    // console.log(testStatus);

    // vue-router
    const routerName = computed(() => {
      return ctx.$router.currentRoute.value.name
    })

    const vuexCommit = () => {
      // commit：同步操作
      ctx.$store.commit('vuexStorageNav/SET_sessionUserToken', testStatus.value + 1)
    }

    const onClickSubmit = (values) => {
      let { username, password } = values
      // dispatch：含有异步操作方法
      store.dispatch('vuexStorageNav/updateTokenCart', username)
      ctx.$toast({
        duration: 3000,
        message: '修改成功!',
        onClose: () => {
          onClickLeft()
        }
      })
      // console.log(values);
      // console.log(username);
    }

    const onClickLeft = () => {
      router.go(-1)
    }

    return {
      ...toRefs(stateData),
      onClickSubmit,
      onClickLeft,
    }
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  box-sizing: border-box;
  height: 100vh;
  padding-top: 90px;
  background-color: #f9f9f9;
}
.v-navbar-box {
  margin-bottom: 30px;
}
.v-form-box {
  padding: 30px 0;
  background-color: #fff;
  /deep/.van-button {
    color: #fff;
    background-color: #fe4f70;
  }
  .v-btn-box {
    padding: 0 30px 10px;
    margin-top: 80px;
  }
}
</style>