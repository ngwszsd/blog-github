---
title: antd字符限制Validator
date: 2021-11-18
tags:
 - tagReact
categories:
 - React
---

# antd字符限制Validator

```js
export const byteCounterValidator = (_, value) => {
    return new Promise((resolve, reject) => {
        const counter = value.replace(/[^\x00-\xff]/g, "xx").length || 0;
        if (counter > 50) {
            reject('最大字符长度为50')
        } else {
            resolve()
        }
    })
}

```

