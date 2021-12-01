---
title: 点击元素复制到剪贴板
date: 2021-11-18
tags:
 - tagReact
categories:
 - React
---

## 点击复制到剪贴板自定义元素
```js
    /**
     * needCopyEle 被复制的对象
     */
    function copyText() {
        const needCopyEle = document.querySelector("#needCopy");
        needCopyEle.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        alert("已复制到剪贴板");
    }
```
## 复制当前元素
```js
    /**
     * copy当前元素的内容
     * param: this
     */
    function copyText(_this) {
        // const needCopyEle = document.querySelector("#needCopy");
        _this.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        alert("已复制到剪贴板");
    }
```

