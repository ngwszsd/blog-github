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
data { id：‘11’, name:‘张三’ }
var keyMap = { id: ‘序列’, name: ‘姓名’ }
var objs = Object.keys(data).reduce((newData, key) => {
    let newKey = keyMap[key] || key
    newData[newKey] = data[key]
    return newData
}, {})

```

