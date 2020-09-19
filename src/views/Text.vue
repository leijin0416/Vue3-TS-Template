<template>
  <div>
    <div>data,watch,computed</div>
    <div>{{ count }}</div>
    <button @click="add">1</button>
    <div>{{ other_count }}</div>
    <div>{{ other_two_count }}</div>
    <div>v-for</div>
    <div v-for="item in demoArr" :key="item">{{ item }}</div>
    <div>vuex：</div>
    <div>{{ testStatus }}</div>
    <button @click="commit">mutation</button>
    <div>vueroter</div>
    <div>{{ routerName }}</div>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"

export default {
  setup() {
    const { ctx } = getCurrentInstance()
    const count = ref(0)
    const other_count = ref(0)
    const demoArr = ref([0, 1, 2, 3])
    const add = () => {
      count.value++
    };
    watch(
      () => count.value,
      () => {
        other_count.value = count.value * count.value
      }
    );
    const other_two_count = computed(() => {
      return other_count.value * other_count.value
    });
    onMounted(() => {
      document.body.style.cssText = "font-size:30px;"
    });
    // vuex
    const testStatus = computed(() => {
      return ctx.$store.state.testStatus
    });
    const commit = () => {
      ctx.$store.commit("set_testStatus", testStatus.value + 1)
    };
    // vue-router
    const routerName = computed(() => {
      return ctx.$router.currentRoute.value.name
    });
    return {
      count,
      add,
      other_count,
      other_two_count,
      demoArr,
      testStatus,
      commit,
      routerName
    }
  }
}
</script>

<style lang="scss" scoped></style>