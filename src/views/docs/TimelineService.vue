<template>
  <div class="components-view">
    <div class="v-service-mian">
      <div class="v-list" v-for="item in timeLineService" :key="item.id">
        <p class="v-time">{{item.pubDate}}</p>
        <div class="v-info">
          <h3 class="v-h3-title">{{item.title}}</h3>
          <p class="v-text">{{item.summary}}</p>
          <p class="v-text">{{item.infoSource}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onMounted, defineAsyncComponent, getCurrentInstance } from "vue"

export default {
  components: {
  },
  props: {
    timeLineService: {
      type: Array,
      required: true
    }
  },
  setup() {
    const { ctx } = getCurrentInstance()
    const count = ref(0)
    const stateData = reactive({
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