<template>
  <div class="components-view">
    <div class="v-rumor-mian">
      <div class="v-list-box">
        <h3 class="v-h3-title">辟谣专区</h3>
        <div class="v-list"
          v-for="item in rumorListData" :key="item.id">
          <div class="v-info">
            <h3 class="v-title">{{item.title}}</h3>
            <div class="v-text">
              <p>{{item.body}}</p>
            </div>
            <p class="v-text-bottom">- {{item.mainSummary}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, onMounted, computed, getCurrentInstance } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"

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
    // 路由
    const router = useRouter()
    // 获取路由信息
    const route = useRoute()
    // 状态管理vuex
    const store = useStore()

    const count = ref(0)
    const stateData = reactive({
      timeLineClassId: ''
    })

    watch( () => count.value,
      () => {}
    )

    onMounted(() => {})

    const routerName = computed(() => {
      return route.currentRoute.value.name
    })

    return {
      ...toRefs(stateData),
    }
  }
}
</script>

<style lang="scss" scoped>
.components-view {
  .v-rumor-mian {
    padding: 30px 0;
    .v-list-box {
      min-height: 500px;
      padding: 30px;
      background-color: #fff;
    }
    .v-h3-title {padding-bottom: 20px;}
    .v-list {
      padding: 30px 0;
      border-bottom: 2px dashed #eee;
      &:last-child {border-bottom: none;}
    }
    .v-text {
      z-index: 5;
      padding: 20px 0 30px;
      text-indent: 2em;
      color: #666;
    }
    .v-text-bottom {
      font-weight: bold;
      color: #fe4f70;
    }
  }
}
</style>