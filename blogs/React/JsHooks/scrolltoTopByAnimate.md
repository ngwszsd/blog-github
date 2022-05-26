---
title: 动画滑动到顶部
date: 2022-05-26
tags:
 - JsHooks
categories:
 - JS Tool
---

# div可随意拖动 

```ts
  function scrollToTop() {
    const scrollTopTimer = setInterval(function() {
      const top = document.body.scrollTop || document.documentElement.scrollTop;
      const speed = top / 30;
      document.documentElement.scrollTop -= speed;
      if (top == 0) {
        clearInterval(scrollTopTimer);
      }
    }, 5);
  }
```
