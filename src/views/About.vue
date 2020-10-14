<template>
  <div class="home">
    <div class="content">
      <div class="user-head">
        <div class="user-avatar">
          <img src="@assets/images/avatar.jpg" alt="" />
        </div>
        <div class="user-info">
          <div class="hello">Good morning!</div>
          <div class="name">Marin Ramsey</div>
          <p>vuex: {{activeIds}}</p>
          <p>
            <router-link to="/text">Lets Go!!!</router-link>
          </p>
        </div>
        <div class="message">
          <div class="message-box">
            <van-icon
              name="smile-comment-o"
              size="30"
              badge="9"
              color="#1989fa"
            />
          </div>
        </div>
      </div>
      <div class="headBox">
        <!-- <span class="back" @click="$router.push('/')">返回</span> -->
        <div class="info">
          <h3>{{id}}</h3>
        </div>
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
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .bottom-bar {
    height: 50px;
  }
  .content {
    flex: 1;
    overflow: auto;
    .user-head {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      .user-avatar {
        width: 80px;
        & > img {
          width: 70px;
          height: 70px;
          border: 1px solid #999;
          border-radius: 50%;
        }
      }
      .user-info {
        flex: 1;
        padding: 12px;
        .hello {
          color: #bfbfbf;
        }
        .name {
          margin-top: 8px;
          font-size: 24px;
          font-weight: bold;
        }
      }
      .message {
        width: 50px;
        display: flex;
        align-items: center;
        .message-box {
          height: 50px;
          width: 50px;
          display: flex;
          align-items: center;
          border-radius: 10px;
          text-align: center;
          justify-content: center;
          box-shadow: 1px 4px 25px rgba($color: #000000, $alpha: 0.15);
        }
      }
    }
  }
}
</style>