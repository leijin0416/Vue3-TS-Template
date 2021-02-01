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
    </header>
    <main>
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
      store.dispatch('vuexStorageDocs/updateDocsAreaStat', '山东')
    })

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

</style>