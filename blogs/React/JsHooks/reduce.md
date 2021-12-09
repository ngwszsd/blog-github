---
title: reduce方法
date: 2021-12-3
tags:
 - JsHooks
categories:
 - JS Tool
---
## 迭代[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- eg1
```js
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + currentValue
}, 10)
```
![详细迭代值](https://s3.bmp.ovh/imgs/2021/12/8a105412a269b580.png)
