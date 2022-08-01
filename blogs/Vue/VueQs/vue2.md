---
title: vue2组件通信
date: 2022-07-29
tags:
 - vue
categories:
 - Vue
---

# 父>子
  ## 名字不能一样！！！ 
  + :father-msg="fatherKey" 
  - Father.vue
```html
    <Son
      :father-msg="fatherKey" 
    />
```
+ 直接props接收使用
- son.vue
```js
props: ['fatherMsg'],
```
# 子>父
  + 两种 1.函数参数 2. $emit发送 ($on) @ | v-on监听
  - Father.vue
```js
    sonToFatherMethed(msg) {
      console.log(msg)
    },
    sonToFatherMethedEmit(emitMsg) {
      console.log(emitMsg)
    }
```
### 命名不能一样！！！ 
```html
    <Son  
      :sonToFather="sonToFatherMethed"
      @sonToFatherEmit="sonToFatherMethedEmit"
    />
```
  + 子组件
  - son.vue
```js
    props: ['sonToFather', 'sonToFatherEmit'],
    // methods
    tofather() {
        this.sonToFather('son-to-father-data')
    },
    tofatherEmit() {
        this.$emit('sonToFatherEmit', 'son-to-father-data-emit')
    }
```    
# 非父子传值(全局状态可以vuex/pinia)
+ main.js  注册$bus
```js
    window.$bus = new Vue;
```
+ brother1.vue
```js
    // methods
    sendMsg() {
      $bus.$emit('send', '我是发过来的')
    },
```
+ brother2.vue
```js
// mounted
    $bus.$on('send', (msg) => {
        this.msg = msg
        console.log(msg) // 我是发过来的
    });
```
# 父组件调用子组件内的方法(ref转发)
+ Father.vue
```html
    <Son  
      ref="childRef" 
    />
```
```js
      // 可以直接执行 this.$refs.child.sonMethod()
      // 如果报找不到sonMethod函数 加上this.$nextTick()延迟执行
      this.$nextTick(() => {
        this.$refs.childRef.sonMethod()
      })
```
- Son.vue
```js
    sonMethod() {
        console.log('sonMethod>>>>>>>>');
    }
```

# Vuex 使用
+ store/index.js
+ action 异步数据
+ mutations 计算数据
+ state 初始数据
+ getter 计算属性
```js
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//引用Vuex
Vue.use(Vuex)

const actions = {
    //响应组件中加的动作 commit相当于dispatch
	jia(context,value){
		context.commit('JIA',value)
	},
  getData({ commit, state }, value) {
      return new Promise((resolve, reject) => {
          resolve({
              name: 'tom',
              age: 18
          })
      })

  }
}

const mutations = {
    //执行加
	JIA(state, value){
		console.log('mutations中的JIA被调用了',state,value)
		state.sum += value
	}
}

//初始化数据
const state = {
   sum: 20
}

const getters = {
	bigSum(state){
		return state.sum * 10
	}
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
  getters,
})
```

## 使用vuex数据 (getter mutations action )
+ 使用map 然后用this访问
```js
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  methods: {
    ...mapActions(['getData']),
    ...mapMutations(['JIA']),
  }
```
+ 异步函数可以map 也可以dispatch
```js
     //  ...mapActions(['getData']),
    this.getData('1112').then(res=> {
      console.log(22222222,res); // { name: 'tom', age: 18 }
    })
    // dispatch(type, payload)
    this.$store.dispatch('getData', '111').then(res => {
      console.log(22222222,res); // { name: 'tom', age: 18 }
    })
```
store的action
```js
const actions = {
    getData({ commit, state }, payload) {
        
        return new Promise((resolve, reject) => {
            resolve({
                name: 'tom',
                age: 18
            })
        })

    }
}
```
## vuex模块化+命名空间
+ store/index.js
+ modules存放各个模块
```js
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//引用Vuex
Vue.use(Vuex)

import test from './test'

//创建并暴露store
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        test,
        // ...
    }
})
```
test/index.js
```js
const actions = {
    //响应组件中加的动作
	jia(context,value){
		context.commit('JIA',value)
	},
    getData({ commit, state }, value) {
        console.log('payload>>>>>>>>>>>>>>', value);
        return new Promise((resolve, reject) => {
            resolve({
                name: 'tom',
                age: 18
            })
        })

    }
}

const mutations = {
    //执行加
	JIA(state, value){
		console.log('mutations中的JIA被调用了',state,value)
		state.sum += value
	}
}

//初始化数据
const state = {
   sum: 20
}

const getters = {
	bigSum(state){
		return state.sum * 10
	}
}

//创建并暴露store
export default {
	actions,
	mutations,
	state,
    getters,
}
```
