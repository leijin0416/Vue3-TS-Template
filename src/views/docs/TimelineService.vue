<template>
  <div class="components-view">
    <div class="v-service-mian">
      <p class="v-text-min" v-if="timeLineService.length === 0">加载中...</p>
      <div class="v-list-box" v-else>
        <div class="v-list"
          v-for="item in timeLineService" :key="item.id">
          <p class="v-time">{{item.pubDate}}</p>
          <div class="v-info">
            <h3 class="v-h3-title">{{item.title}}</h3>
            <div class="v-text" :class="item.classId ? '' : 'v-text-overflow'">
              <p>{{item.summary}}</p>
              <p @click="onAddClassClick(item.id)">更多</p>
            </div>
            <p class="v-text-bottom">来源：{{item.infoSource}}</p>
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
    timeLineService: {
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

    // 点击事件-查看更多
    const onAddClassClick = (id) => {
      props.timeLineService.forEach( (el, i) => {
        if (el.id === Number(id)) el.classId = 1
      });
      // stateData.timeLineClassId = Number(id)
    }

    return {
      ...toRefs(stateData),
      count,
      onAddClassClick,
    }
  }
}
</script>

<style lang="scss" scoped>
.components-view {
  padding-top: 100px;
  .v-service-mian {
    padding: 30px 0;
    .v-list-box, .v-text-min {
      min-height: 500px;
      padding: 30px;
      background-color: #fff;
    }
    .v-text-min {padding-top: 80px; text-align: center; color: #666;}
    .v-list {
      padding: 20px 0 20px 20px;
      border-left: 2px solid rgba(254, 79, 112, 0.3);
      &:nth-child(1) {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }
      .v-time {
        position: relative;
        padding-left: 10px;
        color: #666;
        &::before {
          content: ' ';
          position: absolute;
          left: -52px;
          top: -16px;
          display: block;
          width: 30px;
          height: 30px;
          border: 16px solid #e6e6e6;
          border-radius: 100%;
          background-color: #fe4f70;
          transform: scale(.5);
        }
      }
      .v-info {
        padding: 30px 20px;
        margin: 20px 0 10px;
        border-radius: 10px;
        background-color: #f5f5f5;
      }
      .v-h3-title {
        padding-bottom: 30px;
      }
      .v-text-bottom {
        padding-top: 20px;
        font-size: 24px;
        color: #c3c3c3;
      }
      .v-text {
        position: relative;
        line-height: 1.5;
      }
      .v-text-overflow {
        max-height: 120px;
        overflow: hidden;
        p:last-child {
          position: absolute;
          bottom: -6px;
          right: 0;
          padding: 0 10px 0 60px;
          color: #fe4f70;
          background: -webkit-linear-gradient(left, transparent, #f5f5f5 45%);
          background: -o-linear-gradient(right, transparent, #f5f5f5 45%);
          background: -moz-linear-gradient(right, transparent, #f5f5f5 45%);
          background: linear-gradient(to right, transparent, #f5f5f5 45%);
        }

      }
    }
  }
}
</style>