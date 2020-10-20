# 文档

[文档理解2.0/3.0](https://www.zhihu.com/question/402884177)

- vue2.x中，所有的数据都在data方法中定义返回，方法定义在methods下面，**并通过 this调用**。

- vue3.x中，所有的代码逻辑将在setup方法中实现，包括 `data、watch、computed、methods、hooks`，**并且不再有 this**。

`yarn报错：Found incompatible module`  -解决：`yarn config set ignore-engines true`

`改造ts中，提示找不到模块vue`  -解决：tsconfig.json 的配置有问题：需要将compilerOptions中的 moduleResolution 改为 node。

标签|内容
:-|:-:
`Vue3.0` | [Vue Composition API](https://composition-api.vuejs.org/) [Vue Composition CN API](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html) -- [Vue3.0来袭清单1 jj](https://juejin.im/post/6872113750636232712) -- [Vue3.0来袭清单2 sf](https://segmentfault.com/a/1190000022451034?utm_source=sf-related) -- [Vue3.0来袭清单3 sf](https://segmentfault.com/a/1190000017088044?utm_source=sf-related)
`Vue` | [vue-cli3.0中使用svg](https://blog.csdn.net/qq_41619796/article/details/100997432) -- [自我模拟面试++](https://juejin.im/post/6870374238760894472#comment) -- [深入vue响应式原理](https://juejin.im/post/6844904078724562951)
`JavaScript` | [mock -获取第三方新闻API数据](https://www.jisuapi.com/api/news/) -- [新闻API](https://segmentfault.com/a/1190000009811706?utm_source=sf-related) -- [TS采坑相关](https://www.jianshu.com/p/017ef6300ebc) -- [防抖节流++](https://juejin.im/post/6872144813051871246) -- [手撕JS 1](https://juejin.im/post/6875152247714480136) -- [手撕JS手写 2](https://juejin.im/post/6873513007037546510) -- [手撕闭包](https://juejin.im/post/6874829017006997511)
`面试自检` | [分享自检1 jj](https://juejin.im/post/6873444336059711495) -- [分享自检2 jj](https://juejin.im/post/6874275613360783368)
`vue方法` | [vue方法技巧1 jj](https://juejin.im/post/6874007172578033677#heading-25) -- [DOM diff jj](https://juejin.im/post/6873375844870553608) -- [git 异步组件提案](https://cloud.tencent.com/developer/article/1657954)
`Git` | [git看1](https://github.com/Duanzihuang/heimamovie) -- [git看文2](https://github.com/kaiqiangren/vue-next-ts-preview) --/-- [VUE3 API 1](https://github.com/Duanzihuang/heimamovie/blob/master/src/views/Home.vue) --/-- [VUE3 API 2](https://github.com/qqlcx5/zhihu/blob/master/src/views/Detail.vue)

---

## Vue3.x 生命周期变化

在 vue3 中通过安装 @vue/composition-api 来使用，Composition API的例子：

vue2|vue3|含义
:-|:-:|-:
beforeCreate | setup() | 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
created |setup()| 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)。然而，挂载阶段还没开始，$el 属性目前尚不可用。
beforeMount | onBeforeMount | 在挂载开始之前被调用：相关的 render 函数首次被调用。
mounted | onMounted | 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。
beforeUpdate | onBeforeUpdate | 数据更新时调用，发生在虚拟 DOM 打补丁之前。
updated | onUpdated | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
beforeDestroy | onBeforeUnmount | 实例销毁之前调用。在这一步，实例仍然完全可用。
destroyed | onUnmounted | 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

---

**$nextTick(() => {})**  - DOM更新后执行，也就是页面加载完成后执行回调函数的操作。

---

`options API -VUE3.0 选项型接口`

`composition API -函数式编程思想  Hooks钩子函数`

## 响应式变量声明，钩子函数： ref 或者 reactive 代替data中的变量

- reactive 数据集合。

- reactive 处理的是对象的**响应式双向绑定**，而 ref 则可以处理js基础类型的双向绑定。

- ref 将给定的值创建一个响应式的数据对象并赋值初始值（**int或者string**），reactive 可以直接定义**复杂响应式对象**。

- ref 需要**通过` .value `属性**进行获取值。中译 “引用函数”

```js
/*================ 之前 ================ */
data() {
    return {
        name: 'test',
        list: [],
    }
},
/*================ 之后 ================ */
import { ref, reactive } from 'vue'
setup(){
    const name = ref('test')  // name.value
    const state = reactive({
        list: []
    })
    return {
        name,
        state
    }
}
```

`.value()`是为了让基础类型也具有响应式（现在已经叫做ref了）,reactive就是一般用法。vue3利用proxy实现响应式，而proxy不能代理基础类型，vue3就只能给他包装成一个对象再进行代理

## vue-router 路由

```js
// 组件内部路由拦截器的使用方式
import { useRouter, useRoute } from "vue-router"

setup() {
    // 组件内路由
    const router = useRouter()
    router.beforeEach((to, from, next) => {
        next()
    })
    router.push({
        path: '/'
    })
    // 组件内路由信息
    const route = useRoute();
    const typeTitle = ()  => {
        // console.log(route.meta.title)
        switch (route.meta.title) {
            case 'NAI Trading Center':
                return '正在热映'
            case 'coming_soon':
                return '即将上映'
        }
    }
    return {
        typeTitle
    }
}
```

## vuex 状态管理

创建 `modules` 文件

```JS
import { useStore } from 'vuex'

setup() {
    // 状态管理vuex
    const store = useStore()

    /**
     *  监听vuex
     */
    watch(() => store.state.storageUser.getSessionUserToken, (newer, older) => {
        if (newer == null) {
            return
        } else {
            // 监听 vuex 地址 getSessionUserToken
            state.activeIds = newer
            console.log(`count is ${newer}`)
        }
    }, { deep: true })

    // 加载使用
    onMounted(async () => {
        /**
         *  状态管理
         */
        state.activeIds = store.getters["storageUser/getSessionUserToken"]
        store.commit('storageUser/SET_sessionUserToken', 123)

        const data = sessionData("get", "getSessionUserToken", "")
    })

    return { }
}
// console.log(mapState(store.state),'mapState')
// console.log(mapMutations(store._mutations),'mapMutations')
// console.log(mapActions(store._actions),'mapActions')
// console.log(mapGetters(store.getters),'mapGetters')
```

## watch来监听对象改变

vue3 除了 watch api, 还新增了一个 watchEffect 的 api

[vue3.0](https://www.jianshu.com/p/03862c7bf35a)

```js
setup(){
    const state = reactive({count:0})
    // 更新值
    const changeCount = () => {
        state.count++
    }
    // 必须指定监听属性,不能监听整个state
    watch( () => state.count,
        (count, preCount) => {
            console.log(`新的count${count}----旧的count${preCount}`)
        }, {
        deep: true,
        lazy:true // 默认情况下逐渐初始化会执行一次watch，lazy设置为true初始化不会调用watch
    })
    return{
        // state,
        //或者
        ...toRefs(state),
        changeCount
    }
},
```

## 接收props

在 Vue3 中，setup() 在 beforeCreate和created 时就已调用，无法使用和 Vue2.x 一样的this

```js
export default {
    props: {
        // 必传且是String
        propC: {
            type: String,
            required: true
        },
        // 数字有默认值
        propD: {
            type: Number,
            default: 101
        },
    },
    setup(props:any, ctx:any) {
        console.log(props.propC)
        ctx.emit('event')
    },
}
```

---

```vue
<template>
  <div class='form-element'>
    <h2> {{ state.title }} </h2>
    <input type='text' v-model='state.username' placeholder='Username' />
    <input type='password' v-model='state.password' placeholder='Password' />

    <button @click='login'>
      Submit
    </button>
    <p>
      Values: {{ state.username + ' ' + state.password }}
    </p>
  </div>
</template>
<script>
import { reactive, onMounted, computed } from 'vue'

/**
  context.attrs
  context.slots
  context.parent
  context.root
  context.emit
  context.refs
*/
export default {
  props: {
    title: String
  },
  setup (props, { emit }) {
    const state = reactive({
      username: '',
      password: '',
      lowerCaseUsername: computed(() => state.username.toLowerCase()) // 计算username属性
    })

    onMounted(() => {
      console.log('title: ' + props.title)
    })

    // 子传递父
    const login = () => {
      emit('login', {
        username: state.username,
        password: state.password
      })
    }

    return {
      login,
      state
    }
  }
}
</script>
```
