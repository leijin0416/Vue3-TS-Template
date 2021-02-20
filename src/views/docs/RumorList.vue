<template>
  <div class="components-view">
    <div class="v-rumor-mian">
      <div class="v-list-box">
        <div class="v-list"
          v-for="item in rumorListData" :key="item.id">
          <div class="v-info">
            <h3 class="v-h3-title">{{item.title}}</h3>
            <div class="v-text">
              <p>{{item.body}}</p>
            </div>
            <p class="v-text-bottom">{{item.mainSummary}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onMounted, getCurrentInstance } from "vue"

export default {
  components: {
  },
  props: {
    rumorListData: {
      type: Array,
      required: true
    }
  },
  setup(props, ctxs) {
    const { ctx } = getCurrentInstance()
    const count = ref(0)
    const stateData = reactive({
      timeLineClassId: ''
    })

    watch(
      () => count.value,
      () => {
      }
    )

    onMounted(() => {
    })

    return {
      ...toRefs(stateData),
    }
  }
}
</script>

<style lang="scss" scoped>
.components-view {
  .v-service-mian {
    padding: 30px 0;
    .v-list-box {
      min-height: 500px;
      padding: 30px;
      background-color: #fff;
    }
  }
}
</style>