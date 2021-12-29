---
title: umi-request上传文件的坑
date: 2021-12-28
tags:
 - React QS
categories:
 - React
---

+ [官方解答](https://github.com/umijs/umi-request/issues/180)

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
![](https://cdn.jsdelivr.net/gh/ngwszsd/cdn/win11/umi-req.png)


+ 我的例子
```ts
* batchQuery({payload, callback}, {call}) {
  try {
    const {fileList} = payload
    const formData = new FormData()
    fileList.map(file => {
      formData.append('file', file);
    });
    const {status} = yield call(batchQuery, formData)
    if (status) {
      callback && callback();
      message.success('上传成功！')
    }
  } catch (error) {
    Logs.debug('error', error);
  }
}
// 请求
export async function batchQuery(params: any) {
  return request(apis.BatchQuery, {
    method: 'POST',
    data: params,
    // requestType重要可以看这一篇文章  http://mtw.so/6eDldl
    requestType: 'form',
  });
}
```
```ts
import type {FC} from "react";
import {useState} from "react";
import {Form, Button, Upload, Modal} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
const FreezeUpLoad: FC = ({uploadVisible, handleCancel, handleOk}: any) => {
  const [file, setFile] = useState([])

  const beforeUpload =(file: any) => {
    setFile([file])
  }
  return (
    <>
      <Modal centered title="批量查询" visible={uploadVisible} onOk={() => handleOk(file)} onCancel={handleCancel}>
        <div style={{width: 4, height: 20, background: '#405DA1', position: 'absolute', left: 16, top: 17}}/>
        <Form
          name="validate_other"
        >
          <Form.Item
            name="upload"
            extra=""
          >
            <Upload beforeUpload={beforeUpload} name="file">
              <Button icon={<UploadOutlined/>}>上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FreezeUpLoad
```
+ 自定义Input的file为 e.target.files[0]
```html
<div style={{display: 'flex', alignItems: 'center', width: 200, height: 40, position: 'relative', border: '1px solid #D7D7D7'}}>
  <Input type="file" name={'file'} style={{width: 200, opacity: 0, cursor: 'pointer'}} value={''} onChange={event => handleChange(event)}/>
  <span style={{marginLeft: 20, fontSize: 16,color: '#405DA1', position: 'absolute', right: -50}}>上传</span>
</div>
```
```ts
  const handleChange = e => {
    console.log('>>>>>>>>',[e.target.files[0]]) // 输出二进制文件File: [File] 
  }
```
### 控制台输出
![](https://cdn.jsdelivr.net/gh/ngwszsd/cdn/mac-img/File-bonery.png)
### 下图为正确传参数 network的payload是不会显示参数的 即使你打印到控制台也是空 参照 [找不到Boundary（边界）](http://mtw.so/6eDldl)
![](https://cdn.jsdelivr.net/gh/ngwszsd/cdn/mac-img/binary.png)
