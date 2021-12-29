---
title: 判断excel文件（或者其他后缀）
date: 2021-12-29
tags:
 - JsHooks
categories:
 - JS Tool
---

```js
    /**
     * @param fileName
     * @returns {boolean}
     */
    function isExcel(fileName = '') {
        let suffix = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
        if (suffix === 'xls' || suffix === 'xlsx') {
            return true;
        }
        return false;
    }
```
+ 正则
```js
    /**
     * @param fileName
     * @returns {boolean}
     */
    function isExcel(fileName = '') {
        const _fileName = fileName.toLowerCase();
        const pattern = /^\w{1,}((\.xls)|(\.xlsx)){1}$/;
        return pattern.test(_fileName);
    }
```
