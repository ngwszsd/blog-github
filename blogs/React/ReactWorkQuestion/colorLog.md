---
title: colorLog Debug
date: 2021-11-11
tags:
 - React QS
categories:
 - React
---

# colorLog

```js
export function colorLog(...data) {
    console.log(`%c DEVLOG ↓ \n`, 'margin-left: 1%;border-radius: 10%;font-size:14px;background:gray;color:#98e165;font-weight: bold;', ...data);
}
```

