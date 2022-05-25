---
title: 自定义事件 下载Blob文件，重命名
date: 2022-05-25
tags:
 - JsHooks
categories:
 - JS Tool
---
# 任何文件流都能转成blob来预览或者下载 例如base64 pdf文件流等 [可参考pdf预览的blob转换](https://itluv.me/blogs/React/ReactWorkQuestion/pdfView.html)
## 演示原生下载blob文件 重命名
## 也可以直接用file-saver插件下载

```tsx
import { saveAs } from 'file-saver';
import { useEffect } from 'react';

export default () => {
    // base64格式文件转blob
    const base64ToBlob = (code: string): Blob => {
      const parts = code.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;

      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; i += 1) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    };

  useEffect(() => {
    const res = base64ToBlob('data:image/png;base64,iVBORw0KGgo....');
    // 通过blob创建文件链接
    const urls = URL.createObjectURL(res);
    console.log(111111111, urls, res);
    // @ts-ignore
    document.getElementById('imgsss').src = urls;
    // saveAs(urls, 'xxx.png');

    // 通过创建a标签 自定义点击事件 来下载文件
    const aLink = document.createElement('a');

    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', true, true);
    // 重命名
    aLink.download = 'xxxxss.png';
    aLink.href = URL.createObjectURL(res);
    // 派发自定义事件
    aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  });
  return (
    <div>
      <img id={'imgsss'} src='' alt=""/>
    </div>
  );
};

```