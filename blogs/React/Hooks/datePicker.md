---
title: antd 开始日期小于结束日期
date: 2021-12-1
tags:
 - tagReact
categories:
 - React
---

# antd 开始日期小于结束日期

## Hooks

```js
import { Button, DatePicker } from "antd";
import React, { useState } from "react";
const DatePickers = () => {
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [endOpen, setEndOpen] = useState(null);
  //设置开始日期不能选择的时间
  const disabledStartDate = (startValue) => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  //设置结束不能选择的时间
  const disabledEndDate = (endValue) => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };
  //触发组件改变默认value
  const onChange = (field, value) => {
    if (field == "startValue") {
      setStartValue(value);
    } else if (field == "endValue") {
      setEndValue(value);
    }
  };

  const onStartChange = (value) => {
    onChange("startValue", value);
  };
  const onEndChange = (value) => {
    onChange("endValue", value);
  };
  const handleStartOpenChange = (open) => {
    //设置开始的弹出框
    if (!open) {
      setEndOpen({ endOpen: true });
    }
  };
  const handleEndOpenChange = (open) => {
    //结束的弹出框
    setEndOpen({ endOpen: open });
  };
  //最后就可以打印到获取的时间了
  const getAllValue = () => {
    // 如果想转时间戳可以
    startValue._d.getTime();
  };
  return (
    <>
      <DatePicker
        //是否显示今天
        showToday={false}
        //设置开始日期
        disabledDate={disabledStartDate}
        //格式化时间的
        format="YYYY-MM-DD HH:mm:ss"
        //state中申明一个默认的开始时间为null
        value={startValue}
        placeholder="开始日期"
        onChange={onStartChange}
        onOpenChange={handleStartOpenChange}
      />

      <DatePicker
        //是否显示今天
        showToday={false}
        //设置结束不能选择的时间
        disabledDate={disabledEndDate}
        //格式化时间的
        format="YYYY-MM-DD HH:mm:ss"
        //state中申明一个默认的结束时间为null
        value={endValue}
        placeholder="结束日期"
        onChange={onEndChange}
        open={endOpen}
        onOpenChange={handleEndOpenChange}
      />

      <Button onClick={getAllValue} id="btn-search" type="primary" size="small">
        查询
      </Button>
    </>
  );
};
export default DatePickers;

```

## Class Component
```js
import { Button, DatePicker } from "antd";
import React from "react";
class DatePickers extends React.Component {
  constructor() {
    super();
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  }
  render() {
    return (
      <>
        <DatePicker
          //是否显示今天
          showToday={false}
          //设置开始日期
          disabledDate={this.disabledStartDate}
          //格式化时间的
          format="YYYY-MM-DD HH:mm:ss"
          //state中申明一个默认的开始时间为null
          value={this.state.startValue}
          placeholder="开始日期"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />

        <DatePicker
          //是否显示今天
          showToday={false}
          //设置结束不能选择的时间
          disabledDate={this.disabledEndDate}
          //格式化时间的
          format="YYYY-MM-DD HH:mm:ss"
          //state中申明一个默认的结束时间为null
          value={this.state.endValue}
          placeholder="结束日期"
          onChange={this.onEndChange}
          open={this.state.endOpen}
          onOpenChange={this.handleEndOpenChange}
        />

        <Button
          onClick={this.getAllValue}
          id="btn-search"
          type="primary"
          size="small"
        >
          查询
        </Button>
      </>
    );
  }
  //设置开始日期不能选择的时间
  disabledStartDate = (startValue) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  //设置结束不能选择的时间
  disabledEndDate = (endValue) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };
  //触发组件改变默认value
  onChange = (field, value) => {
      console.log(111111111111111,field, value)
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange("startValue", value);
  };
  onEndChange = (value) => {
    this.onChange("endValue", value);
  };
  handleStartOpenChange = (open) => {
    //设置开始的弹出框
    if (!open) {
      this.setState({ endOpen: true });
    }
  };
  handleEndOpenChange = (open) => {
    //结束的弹出框
    this.setState({ endOpen: open });
  };
  //最后就可以打印到获取的时间了
  getAllValue = () => {
    console.log(this.state.startValue, this.state.endValue);
    // 如果想转时间戳可以
    this.state.startValue._d.getTime();
  };
}
export default DatePickers;

```