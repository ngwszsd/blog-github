---
title: umi-request上传文件的坑
date: 2021-12-28
tags:
 - React QS
categories:
 - React
---

[官方解答](https://github.com/umijs/umi-request/issues/180)

```js
export async function uploadImage({ file, filename }) {
  const formData = new FormData()
  formData.append('file', file)
  return request(`/api/uploadfile?name=${filename}`, {
    method: 'POST',
    body: formData,
  })
} 
```
参数file为Upload的api beforeUpload方法的组成的数组
```js
  const [file, setFile] = useState([])
  const beforeUpload =(file: any) => {
    setFile([file])
  }
  file就作为参数
```
![](https://s3.bmp.ovh/imgs/2021/12/6b7245dcf37fe642.png)
