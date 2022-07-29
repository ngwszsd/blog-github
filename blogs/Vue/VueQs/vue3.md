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

