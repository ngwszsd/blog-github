---
title: 查询后返回显示之前数据与查询结果
date: 2021-12-08
tags:
 - React QS
categories:
 - React
---

## 问题>>> 条件查询后 进入查询结果详情 再返回 不显示之前数据与查询结果
## 期望>>> 返回后显示之前数据与查询结果
## 解决>>> 条件存入sessionStorage 查询后删除sessionStorage 

### 查询按钮
```js
  const onFinish = () => {
    const values = form.getFieldsValue();
    sessionStorage.setItem('$searchDataStorage', JSON.stringify(values));
    handleSearch(values);
  };
```
### useEffect钩子  注意依赖为 []
```js
  useEffect(() => {
    let searchData = JSON.parse(sessionStorage.getItem('$searchDataStorage'));
    if (searchData && JSON.stringify(searchData) !== '{}') {
      form.setFieldsValue(searchData);
      sessionStorage.removeItem('$searchDataStorage');
      handleSearch(searchData);
    }
  }, [])
```

