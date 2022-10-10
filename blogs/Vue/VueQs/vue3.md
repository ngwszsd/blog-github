---
title: vue3组件通信（vite）
date: 2022-10-10
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

// setup写外面 父组件调用子组件方法 defineExpose 接收
<script lang="ts" setup>
const props = defineProps<{
  values: string;
  name: string;
  handleOk: (a: string) => void;
}>();

const emits = defineEmits<{
  (e: 'sonToFatherEmit', id: string, secondPar: string): void
}>()
const doSth = () => {
  console.log('>>>>>>>>>>>>>>')
}
defineExpose({ doSth })
console.log(emits);
const click = () => {
  props.handleOk('111111111111')
  emits('sonToFatherEmit', "123", 'secondPar')
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
## watch监听 数据
+ watch监听到ref reactive数据 
+ watchEffect会自动检测你的数据但不能拿到oldValue

### 这四种结果一样 > 都会在onMounted后首次执行导致多次请求!!!! 而且新旧值相同
### 
```ts
// 侦听getter 函数 需要加deep: true才能和下方一样 否则不生效
watch(() => paginationPar, (val, oldValue) => {
  console.log(2222222,val, oldValue)
}, { deep: true })
// 普通引用对象
watch(paginationPar, (val, oldValue) => {
  console.log(2222222,val, oldValue)
})

// 放进数组的方式 侦听getter 函数 需要加deep: true才能和下方一样 否则不生效
watch(() => [paginationPar], ([val]) => {
  console.log(2222222,val)
}, {deep: true})
// 放进数组的方式 会首次执行
watch([paginationPar], ([val]) => {
  console.log(2222222,val)
})

```
### 侦听引用对象的一个变化值 监听不到值情况 （可以改成侦听getter 函数）
```ts
// 侦听引用对象的一个变化值 ts报错 原因可能是watch只能侦听响应式数据源 加不加deep: true ts都报错  而且监听不到值
watch(paginationPar.current, (val, oldValue) => {
  console.log(2222222,val, oldValue)
}, {deep: true})
// 放入数组一样监听不到值
watch([paginationPar.current], (val, oldValue) => {
  console.log(2222222,val, oldValue)
})
```

### getter函数方式侦听引用对象的一个变化值 以下两种都可以拿到新旧值！！！ 
```ts
watch(() => paginationPar.current, (val, oldValue) => {
  console.log(2222222,val, oldValue)
})
watch(() => [paginationPar.current], ([val], [oldValue]) => {
  console.log(2222222,val, oldValue)
})
```

### 侦听多个引用对象的一个变化值 都可以拿到新旧值！！！ 
```ts
// 标准写法
watch(() => [paginationPar.current, paginationPar.pageSize], ([val1, val2], [oldValue1,oldValue2]) => {
  console.log(2222222,val1, val2,oldValue1,oldValue2)
})
// 这样无论怎么样都拿不到值
watch([paginationPar.current, paginationPar.pageSize], ([val1, val2], [oldValue1,oldValue2]) => {
  console.log(2222222,val1, val2,oldValue1,oldValue2)
})
```
## 结论：
+ 侦听引用对象时： 可能会因为首次运行导致多次请求， { deep: true }仅仅适用于侦听某一个对象 不能拿到新旧值，发现是相同的
+ 侦听引用对象的一个变化值时： 需要在一个getter函数内 否则不生效 不会导致多次请求 能拿到新旧值


```ts
const values = ref(666);
watch(values, (newValue, oldValue) => {
  console.log('侦听器>>>>', newValue, oldValue)
})



watchEffect(() => {
  console.log(counter.count)
})
```
## JSX写法
安装`import vueJsx from '@vitejs/plugin-vue-jsx'` 像使用vue()一样在plugins使用
```ts
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    vueJsx(),
  ]
```
```tsx
import { Breadcrumb, BreadcrumbItem, Button } from "ant-design-vue";
import { defineComponent, onMounted, withModifiers } from "vue";
import { fetchGetCommunity } from "~/services/text";
import { useCounterStore } from '~/store/counter'
import axios from '../utils/http'
const Text = defineComponent({
  setup() {
    const count = ref(0);
    const counter = useCounterStore();
    const inc = () => {
      count.value++;
    };

    /**
     *
     */
    const getCommunity = async () => {
      const res = await fetchGetCommunity();
    };
    onMounted(() => {

    });
    return () => (
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>
          <a onClick={getCommunity}>Application Center</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a onClick={inc}>111{{ count }}</a>
        </BreadcrumbItem>
        <BreadcrumbItem>An Application</BreadcrumbItem>家中有事，请假三天
      </Breadcrumb>
    );
  },
});

export default Text;

```


## 注意
+ 引入文件需要带.vue
+ ref 的值可以在template直接{{}} 用 但是在script要 .value拿到 
+ pinia 最后可能需要这个来触发热更新 `if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))`
+ 最好使用最新的`<script lang="ts" setup> </script>` 尽量抛弃vue2的写法