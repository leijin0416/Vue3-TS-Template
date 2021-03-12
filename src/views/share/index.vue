<template>
  <div class="router-view">
    <QrCanvasImage />
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onMounted, getCurrentInstance, defineAsyncComponent } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"

const QrCanvasImage = defineAsyncComponent(() => import('@/components/QrCanvasImage/index.vue'))

export default {
  components: {
    QrCanvasImage,
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
    const vuexStoreNav = store.state.vuexStorageNav
    const count = ref(0)
    const stateData = reactive({
      username: '',
      password: '',
    })
    
    watch( () => vuexStoreNav.getSessionUserToken, (newVal, oldVal) => {
        // console.log(newVal);
        // console.log(oldVal);
    })

    onMounted(() => {
      // store.dispatch('vuexStorageDocs/updateDocsAreaStat', '山东')
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

    const onClickLeft = () => {
      router.go(-1)
    }

    return {
      ...toRefs(stateData),
      onClickLeft,
    }
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  background-color: #f9f9f9;
}
</style>