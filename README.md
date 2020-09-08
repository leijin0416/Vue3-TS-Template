# 文档

- vue2.x中，所有的数据都在data方法中定义返回，方法定义在methods下面，**并通过 this调用**。

- vue3.x中，所有的代码逻辑将在setup方法中实现，包括 `data、watch、computed、methods、hooks`，**并且不再有 this**。

`yarn报错：Found incompatible module`  -解决：`yarn config set ignore-engines true`

`改造ts中，提示找不到模块vue`  -解决：tsconfig.json 的配置有问题：需要将compilerOptions中的 moduleResolution 改为Node。

[mock -获取第三方新闻数据](https://www.jisuapi.com/api/news/) --|-- [新闻](https://segmentfault.com/a/1190000009811706?utm_source=sf-related)

---

## Vue3.x 生命周期变化

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

看：https://juejin.im/post/6844904078724562951

---

在 vue3 中通过安装 @vue/composition-api 来使用，Composition API的例子：

## ref 或者 reactive 代替data中的变量

reactive 处理的是对象的双向绑定，而 ref 则可以处理js基础类型的双向绑定。

```js
/*================ 之前 ================ */
data() {
    return {
        name: 'test',
        list: [],
    }
},
/*================ 之后 ================ */
import {ref,reactive} from 'vue'
setup(){
    const name = ref('test')
    const state = reactive({
        list: []
    })
    return {
        name,
        state
    }
}
```

ref 将给定的值创建一个响应式的数据对象并赋值初始值（**int或者string**），reactive 可以直接定义**复杂响应式对象**。

## watch来监听对象改变

vue3 除了 watch api, 还新增了一个 watchEffect 的 api

[vue3.0](https://www.jianshu.com/p/03862c7bf35a)

```js
setup(){
    const state=reactive({count:0})
    const changeCount=()=>{
        state.count++;
    }
    // 必须指定监听属性,不能监听整个state
    watch(
        () => state.count,
        (count, preCount) => {
            console.log(`新的count${count}----旧的count${preCount}`)
        },
        {
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
        name: String,
    },
    setup(props,ctx) {
        console.log(props.name)
        ctx.emit('event')
    },
}
```
