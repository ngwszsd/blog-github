---
title: PDF预览问题
date: 2022-05-24
tags:
 - React QS
categories:
 - React
---

## react的文件预览插件react-pdf | react-file-viewer 都是基于pdf.js封装 预览pdf不清楚， docx很清楚

+ 注意
 需要设置 responseType: 'blob' 不然请求的文件流内容缺失
 + url 后添加 '#toolbar=0' 隐藏操作栏
```ts
  function getStream() {
    request('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8e76dff9-ce38-4577-9e5c-398943705060/a5b050b8-3fa1-4436-b231-7b40725de731.pdf', {
      method: 'get',
      responseType: 'blob',
    }).then((res) => {
      const blob = new Blob([res], {
        type: 'application/pdf',
      });
      const url = URL.createObjectURL(blob);
      console.log('blob>>>', blob, res, url);
      const iframeDom = document.getElementById('iframe') as HTMLFormElement;
      iframeDom.src = url + '#toolbar=0';
    });
  }
  
```
+ 使用iframe预览 解决react-pdf插件预览pdf不清楚
```tsx
    <iframe src="" id="iframe" frameBorder="0" style={{ width: '100%', height: '100vh' }}  />
```



