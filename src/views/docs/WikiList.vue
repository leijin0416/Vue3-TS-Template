<template>
  <div class="components-view">
    <div class="v-wiki-mian">
      <div class="v-list-box">
        <h3 class="v-h3-title">疫情科普</h3>
        <div class="v-list"
          v-for="item in wikiListData" :key="item.id">
          <div class="weui-flex">
            <div class="weui-cell-hd" v-if="item.id !== 9">
              <img :src="item.imgUrl" alt="wiki.png" class="v-img">
            </div>
            <div class="weui-cell-bd">
              <h3 class="v-title">{{item.title}}</h3>
              <div class="v-text">
                <a :href="item.linkUrl" class="v-ahover">{{item.description}} <span>查看</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, onMounted, getCurrentInstance } from "vue"

export default {
  components: {
  },
  props: {
    wikiListData: {
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

    watch( () => count.value,
      () => {}
    )

    onMounted(() => {})

    return {
      ...toRefs(stateData),
    }
  }
}
</script>

<style lang="scss" scoped>
.components-view {
  .v-wiki-mian {
    padding-bottom: 30px;
    .v-list-box {
      min-height: 500px;
      padding: 30px;
      background-color: #fff;
    }
    .weui-flex {align-items: end;}
    .v-h3-title {padding-bottom: 20px;}
    .weui-cell-bd {
      padding-left: 20px;
    }
    .v-list {
      padding: 30px 0;
      border-bottom: 2px dashed #eee;
      &:nth-child(2) .weui-cell-bd {padding-left: 0;}
      &:last-child {border-bottom: none;}
    }
    .v-text {
      position: relative;
      padding: 20px 0 0;
      .v-ahover {
        color: #666;
      }
      span {
        color: #fe4f70;
      }
    }
    .v-img {
      width: 180px;
    }
  }
}
</style>