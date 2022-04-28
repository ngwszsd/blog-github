---
title: callback执行顺序
date: 20212-04-28
tags:
 - React QS
categories:
 - React
---

## eg1和eg2区别
doSomeThing必须放在回调执行

### eg1
```ts
const doSomeThing = () => {

};
dispatch({
  type: `${namespace}/getUserInfo`,
  callback: () => {
    doSomeThing();
  }
});
```
### eg2
```ts
const doSomeThing = () => {

};
dispatch({
  type: `${namespace}/getUserInfo`,
  callback: doSomeThing();
});

