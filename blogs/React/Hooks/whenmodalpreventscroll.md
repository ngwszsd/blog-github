---
title: 弹框阻止body滚动
date: 2021-11-18
tags:
 - tagReact
categories:
 - React
---

# 弹框阻止body滚动 用于不用antd的时候

## 弹窗时

```js
document.body.addEventListener("touchmove", this.scroll || window.scroll, {passive: false });
document.body.style.overflow = 'hidden';
```

## 离开弹窗
```js
document.body.removeEventListener('touchmove', this.scroll);
//添加事件监听时添加了passive参数，在ios9中移除事件监听也需要加此参数
document.body.removeEventListener('touchmove', this.scroll || window.scroll, {passive: true});
document.body.style.overflow = 'auto';
```


