---
title: vue3组件通信（vite）
date: 2022-07-29
tags:
 - vue3
categories:
 - Vue
---

## 使用vite第三方框架 [vitesse](https://github.com/antfu/vitesse)
### 父传子 | 子传父
  
  - 父传子传递 values name
  - 子传父 handleOk sonToFatherMethedEmit

+ Father.vue
```js
<script lang="ts" setup>
import Son from "./Son.vue";

const values = ref("我是父组件的值");
console.log(values.value);

const handleOk = (value: string) => {
  console.log(value);
};

const sonToFatherMethedEmit = (emitMsg: string) => {
  console.log(emitMsg);
};
</script>

<template>
  <Son
    :values="values"
    :name="'Tom'"

    :handleOk="handleOk"
    @sonToFatherEmit="sonToFatherMethedEmit"
  />
  <div>{{ values.value }}</div>
</template>

<style scoped></style>
```
+ 1 setup写在里面方式
+ （父传子）props接收数组参数 | setup 参数接收props使用

- （子传父）handleOk直接在 `props.handleOk('ccccccccc')` 传递
- （子传父）setup写在里面时 setup接收ctx上下文 调用emit 传值 `ctx.emit
('sonToFatherEmit', 'xxxxxxxxxxx')`

Son.vue
```js
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: ['name', 'values', 'sonToFatherEmit'],
  mounted() {
    console.log(this.name, this.values)
  },
  setup(props, ctx) {
    const value = ref<string>('');
    onMounted(() => {
      console.log(props)
    })
    const clicks = () => {
      props.handleOk('ccccccccc')
      ctx.emit('sonToFatherEmit', 'xxxxxxxxxxx')
    }
    return {
      value,
      clicks
    };
  },
});
</script>
<template>
  <Button @click="clicks">++++++</Button>
  <Button @click="click">-------</Button>
</template>

<style scoped lang="less"></style>

```
+ 2 setup写在外面方式 

+ （父传子）defineProps接收 要写泛型否则接收不到没写的值

+ （子传父）`props.handleOk('111111111111')`
+  (子传父) defineEmits接收函数 ` emits('sonToFatherEmit', "123")`
```js
<script lang="ts" setup>
const props = defineProps<{
  values: string;
  name: string;
  handleOk: (a: string) => void;
}>();

const emits = defineEmits<{
  (e: 'sonToFatherEmit', id: string): void;
}>()

console.log(emits, props);
const click = () => {
  props.handleOk('111111111111')
  emits('sonToFatherEmit', "123")
}
</script>
```

### 父组件调用子组件方法
+ Father.vue
创建 childRef 组件里使用ref
childRef.value调用 找不到子组件的方法可以套一层nextTick
```js
const childRef = ref<any>();
  // childRef.value.doSth();
  nextTick(() => {
    childRef.value.doSth();
  })
<Son ref='childRef'>

```
+ Son.vue
+ 要调用的方法doSth可以卸载setup也可以在methods
```js

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: ["name", "values", "sonToFatherEmit", 'handleOk'],
  // methods: {
  //   doSth() {
  //     console.log('>>>>>>>>>>')
  //   }
  // },
  mounted() {
    console.log(this.name, this.values);
  },
  setup(props, ctx) {
    const doSth = () => {
      console.log('>>>>>>>>>>')
    }
    const value = ref<string>("");
    onMounted(() => {
      console.log(props);
    });
    const clicks = () => {
      ctx.emit("sonToFatherEmit", "xxxxxxxxxxx");
      props.handleOk('ccccccccc')
    };
    return {
      value,
      clicks,
      doSth
    };
  },
});
</script>

```
### 状态管理pinia
+  main.ts
  ```ts
  app.use(createPinia())
  ```
+  /src/store
- 定义一个use的  useCounterStore  直接 使用 `const counter: A = 
- 异步同步函数都写在action里
useCounterStore()`
```ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 111111 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
    getData() {
      return new Promise((resolve: any, reject: any) => {
        resolve([
          {
            id: 1,
            name: 'tom',
            age: 18
          },
          {
            id: 2,
            name: 'jerry',
            age: 14
          },
          {
            id: 3,
            name: 'spark',
            age: 22
          }
        ])
      })
    }
  },
})
```

### pinia更新数据this.$patch
```ts
// @ts-check
import { defineStore, acceptHMRUpdate } from 'pinia'

/**
 * Simulate a login
 * @param {string} a
 * @param {string} p
 */
function apiLogin(a, p) {
  if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true })
  if (p === 'ed') return Promise.resolve({ isAdmin: false })
  return Promise.reject(new Error('invalid credentials'))
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: 'Eduardo',
    isAdmin: true,
  }),

  actions: {
    logout() {
      this.$patch({
        name: '',
        isAdmin: false,
      })

      // we could do other stuff like redirecting the user
    },

    /**
     * Attempt to login a user
     * @param {string} user
     * @param {string} password
     */
    async login(user, password) {
      const userData = await apiLogin(user, password)

      this.$patch({
        name: user,
        ...userData,
      })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}


```