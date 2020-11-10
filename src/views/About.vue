<template>
  <div class="page">
    <div class="container">
      <div class="user-head">
        <div class="user-avatar">
          <img src="@assets/images/avatar.jpg" alt="" />
        </div>
        <div class="user-info">
          <div class="hello">Good morning!</div>
          <div class="name">Marin Ramsey</div>
          <p>vuex: {{searchValue}}</p>
          <p>
            <!-- <span class="back" @click="$router.push('/')">返回</span> -->
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
      <div class="v-head-box">
        <div class="info">
          <h3>{{id}}</h3>
          <div class="v-input-box">
            <van-search 
              v-model="searchValue"
              @search="onSearchClick"
              placeholder="请输入基金代码或名称" />
              <ul>
                <li
                  v-for="(item, index) in matchList"
                  :key="index" >
                    <span v-html="highlight(item.code, searchValue)" class="fund-code" />
                    <span v-html="highlight(item.name, searchValue)" />
                    <span class="fund-type" :style="{ color: fundTypeColors.get(item.type) || '#3e3a3a' }">{{ item.type }} </span>
                  </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { watch, toRefs, ref, reactive } from "vue"
import searchData from '@/mock/searchData'
// import API from "../api"

type MatchItem = {
  code: string,
  shortcut: string,
  name: string,
  type: string,
}

export default {
  setup() {
    let id = ref(1)
    let state = reactive({
      image: '',
      body: '',
      title: '',
      section: '',
    })
    let searchValue = ref('')
    let matchList = ref<MatchItem[]>([])

    watch(id, async () => {
      // let { image, body, title,section } = await API.zhihu.API_DETAIL(id.value)
      // state.body = body
      // state.title = title,
      // state.section = section? section.name : '佚名'
    })
    
    /**
     *  监听输入框的值  3点3个流程
     */
    watch(searchValue, (newer, older) => {
      // 1 监听，输入框值过滤
      const preList = newer ? searchData.filter((d) => d.some(searchsMapSome)).slice(0, 8) : []
      console.log(preList)
      // 3 返回新数组
      matchList.value = preList.map((item) => {
        const [code, shortcut, name, type] = item
        return { code, shortcut, name, type }
      })
      console.log(matchList.value)
    })

    // 2 some 用于检测数组中的元素是否满足指定条件
    const searchsMapSome = (input: any) => {
      // 查找字符串是否包含 "searchText.value.toUpperCase() 的值"
      return input.includes(searchValue.value.toUpperCase())
    }

    // 4 replace 替换, 正则
    const highlight = (text: string, keyword: string) => {
      return text.replace(new RegExp(keyword, 'ig'), `<span class='active'>${keyword}</span>`);
    }

    const onSearchClick = (val: string) => {
      console.log(val)
    }

    // map() 方法返回一个新数组，get() 可以取值
    const fundTypeColors = new Map([
      ['混合型', '#d08a31'],
      ['债券型', '#318fbb'],
      ['股票型', '#ef0505'],
      ['货币型', '#67bf43'],
      ['定开债券', '#32af86'],
      ['联接基金', '#8e26a7'],
      ['QDII', '#d03077'],
      ['QDII-指数', '#f562a4'],
      ['股票指数', '#ce2222'],
      ['混合-FOF', '#317929'],
    ])

    return {
      searchValue,
      matchList,
      fundTypeColors,
      id,
      onSearchClick,
      highlight,
      ...toRefs(state)
    }
  },
  beforeMount(){
    // let { id } = this.$route.params
  }
}
</script>

<style lang="scss" scoped>
/deep/.van-field__label {width: 20px;}
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .bottom-bar {
    height: 50px;
  }
  .container {
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
    .v-head-box {
      h3 {padding: 15px;}
    }
  }
}
</style>