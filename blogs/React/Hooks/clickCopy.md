---
title: 点击复制到剪贴板
date: 2021-11-18
tags:
 - tagReact
categories:
 - React
---

# 点击复制到剪贴板（需要一个input）否则不生效

```js
let inputElem = document.getElementById('text_input');
let textElem = document.querySelector('#pppp');
textElem.addEventListener('click', function() {
    inputElem.value = textElem.innerText;
    inputElem.select();
    var result = document.execCommand('copy');
    if(result) {
        console.log('copy success');
    } else {
        console.error('copy fail');
    }
});

```

