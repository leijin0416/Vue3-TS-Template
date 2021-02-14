<template>
  <div class="router-view">
    <div class="v-service-mian">
      <div class="v-list" v-for="item in timeLineService" :key="item.id">
        <div class="weui-flex">
          <div class="weui-cell-hd">
            <img :src="item.imgurl" alt="" srcset="" class="v-img" >
          </div>
          <div class="weui-cell-bd">
            <h3 class="v-h3-title">{{item.title}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch, computed, onMounted, getCurrentInstance } from "vue"

export default {
  setup() {
    const { ctx } = getCurrentInstance()
    const count = ref(0)
    const stateData = reactive({
      timeLineService: [],
    })

    watch(
      () => count.value,
      () => {
        other_count.value = count.value * count.value
      }
    )

    onMounted(() => {
    })

    // vuex
    const testStatus = computed(() => {
      return ctx.$store.state.testStatus
    })
    const routerName = computed(() => {
      return ctx.$router.currentRoute.value.name
    })

    return {
      ...toRefs(stateData),
      count,
    }
  }
}
</script>

<style lang="scss" scoped></style>