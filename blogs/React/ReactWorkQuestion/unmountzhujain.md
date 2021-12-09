---
title: 未卸载组件导致线上报错 （本地警告）
date: 2021-11-18
tags:
 - React QS
categories:
 - React
---

# 解决办法 ：卸载所有异步请求

## class Component
```js
componentWillUnmount() {
  this.setState = (state, callback) => {
    return;
  }
}
```

## Function Com
```js
useEffect(() => {
    let isUnmount = false
    if (isSuccess(res) && !isUnmount) {
        ...ajax
    }
    return () => {
        isUnmount = true
    }
})
```

