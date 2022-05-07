---
title: 上传图片时压缩后再上传
date: 2022-05-07
tags:
 - React QS
categories:
 - React
---

## 图片缩放和降低清晰度的方式
```ts
  const beforeUpload = (file: RcFile): Promise<any> => {
    return new Promise(resolve => {
      // 图片压缩
      const reader = new FileReader(), img = new Image();
      reader.readAsDataURL(file);
      reader.onload = function(e: any) {
        img.src = e.target.result;
      };

      img.onload = function() {
        const that: any = this;
        const canvas: any = document.createElement('canvas');
        const context: any = canvas.getContext('2d');

        const originWidth = that.width;
        const originHeight = that.height;

        canvas.width = originWidth;
        canvas.height = originHeight;

        context.clearRect(0, 0, originWidth, originHeight);
        context.drawImage(img, 0, 0, originWidth, originHeight);

        canvas.toBlob((blob: Blob) => {
          const imgFile = new File([blob], file.name, { type: file.type }); // 将blob对象转化为图片文件
          resolve(imgFile);
        }, file.type, 0.2); // file压缩的图片类型
      };
    });
  };
```
### jsx
```tsx
      <Upload
        beforeUpload={beforeUpload}
        accept={props.accept}
        disabled={props.disabled}
        action="/api/file/UploadToFileSystem"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
        onRemove={props.onRemove}
      >
        {fileList.length >= limitCount ? null : uploadButton}
      </Upload>
```
