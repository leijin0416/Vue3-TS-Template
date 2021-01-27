<template>
  <div class="router-view">
    <header>
      <div class="v-header-user">
        <div class="weui-flex">
          <div class="weui-cell-hd">
            <img src="@assets/images/avatar.jpg" alt="user.png" class="v-img" />
          </div>
          <div class="weui-cell-bd">2</div>
        </div>
      </div>
    </header>
    <p>所有的学习，最开始都像是在照镜子，无非是学到了，再换一个老师，换一面镜子，直到有一天你发现，你的新的镜子里是你自己，你就有你自己的方法了，你就可以做别人的镜子了</p>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"

export default {
  setup() {
    const { ctx } = getCurrentInstance()  // 获取当前组件实例,this
    const count = ref(0)
    
    watch( () => count.value, (newVal, oldVal) => {
      }
    )

    const other_two_count = computed(() => {
    })

    onMounted(() => {
    })

    // vuex
    const testStatus = computed(() => {
      return ctx.$store.state.testStatus
    })

    const commit = () => {
      ctx.$store.commit("set_testStatus", testStatus.value + 1)
    }

    // vue-router
    const routerName = computed(() => {
      return ctx.$router.currentRoute.value.name
    })

    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>