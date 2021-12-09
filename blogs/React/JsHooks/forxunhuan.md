---
title: for循环问题var 解决办法
date: 2021-12-3
tags:
 - JsHooks
categories:
 - JS Tool
---

#  for循环问题

```js
// let
    for (let i = 0; i < 5; ++i) {
        setTimeout(() => console.log(i), 0)
    }
// 闭包
    for (var i = 0; i < 5; ++i) {
        setTimeout((i) => console.log(i), 0, i)
    }
// 闭包
    for (var i = 0; i < 5; ++i) {
        (function (i) {
            setTimeout(() => console.log(i), 0)
        })(i)
    }    
```