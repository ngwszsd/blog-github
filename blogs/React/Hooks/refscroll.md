---
title: react ref监听滚动
date: 2021-11-18
tags:
 - tagReact
categories:
 - React
---


## 元素属性
```js
ref={c => {this.scrollRef = c;}}  onScrollCapture={() => this.onScrollHandle()}
```

```js
const onScrollHandle = () => {
  const scrollTop = this.scrollRef.scrollTop;
  const clientHeight = this.scrollRef.clientHeight;
  const scrollHeight = this.scrollRef.scrollHeight
  // console.log(scrollTop, clientHeight, scrollHeight)
  if (scrollTop>94) {
    this.setState({
      fixed : true
    })
  }
  if (scrollTop<94) {
    this.setState({
      fixed : false
    })
  }
}

componentWillUnmount(){
  window.removeEventListener('scroll', this.handleScroll);
}

// function companont
useEffect(() => {
    return () => {
        window.removeEventListener('scroll', this.handleScroll);
    }
})

```