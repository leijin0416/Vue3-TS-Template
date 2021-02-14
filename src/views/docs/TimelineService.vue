<template>
  <div class="components-view">
    <div class="v-service-mian">
      <div class="v-list" v-for="item in timeLineService" :key="item.id">
        <h3 class="v-h3-title">{{item.title}}</h3>
        <p class="v-text">{{item.summary}}</p>
        <p class="v-text">{{item.infoSource}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onMounted, defineAsyncComponent, getCurrentInstance } from "vue"

export default {
  components: {
  },
  setup() {
    const { ctx } = getCurrentInstance()
    const count = ref(0)
    const stateData = reactive({
      timeLineService: [
        {
          id: 1,
          title: '123',
          summary: '123',
          infoSource: '',
        }
      ],
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