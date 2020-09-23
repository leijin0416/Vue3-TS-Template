<template>
  <div class="detailBox">
    <h1>This is an about page</h1>
    <div class="headBox">
      <span class="back" @click="$router.push('/')">返回</span>
      <div class="info">
        <h3>{{id}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, toRefs, ref, reactive } from "vue"
// import API from "../api"

export default {
  setup() {
    let id = ref(1);
    let state = reactive({
      image: '',
      body: '',
      title: '',
      section: ''
    });
    watch(id, async () => {
      // let { image, body, title,section } = await API.zhihu.API_DETAIL(id.value)
      // state.image = image
      // state.body = body
      // state.title = title,
      // state.section = section? section.name : '佚名'
    });
    return {
      id,
      ...toRefs(state)
    }
  },
  beforeMount(){
    let { id } = this.$route.params
    // console.log(id)
  }
}
</script>

<style lang="scss" scoped>

</style>