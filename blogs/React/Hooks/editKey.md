---
title: 修改{}的key
date: 2021-11-18
tags:
 - tagReact
categories:
 - React
---

# 修改{}的key

```js
var data = { name: '张三', id: '11' }
var keyMap = { name: '姓名', id: '序列' }
var objs = Object.keys(data).reduce((newData, key) => {
    let newKey = keyMap[key] || key
    newData[newKey] = data[key]
    return newData
}, {})
console.log(objs)

```

