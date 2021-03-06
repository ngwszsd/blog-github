---
title: Mobx的observer 和 observable
date: 2021-11-17
tags:
 - mobx
categories: 
 - React

---

# useObserver相当于外部观察observer

```js
import {useLocalObservable, useObserver} from 'mobx-react'

export default function Demo () {
  const store = useLocalObservable(() => ({
    count: 0,
    setCount () {
      this.count++
    }
  }))
  return useObserver(() => (
    <div onClick={store.setCount}>Mobx6: {store.count}</div>
  ))
}

```
```js
import {useLocalObservable, useObserver} from 'mobx-react'
import { observer } from 'mobx-react'
export default observer(function Demo () {
  const store = useLocalObservable(() => ({
    count: 0,
    setCount () {
      this.count++
    }
  }))
  return (
    <div onClick={store.setCount}>Mobx6: {store.count}</div>
  )
})
```

# useState 加 observable 声明mobxstore 或者使用 useLocalObservable 

```js
import { observer } from "mobx-react-lite"
import { observable, makeAutoObservable } from "mobx"
import { useState } from "react"

class Timer {
    secondsPassed = 0
    constructor() {
        makeAutoObservable(this)
    }
    increaseTimer() {
        this.secondsPassed += 1
    }
}
const TimerView = observer(() => {
    const [timer] = useState(() => new Timer()) // See the Timer definition above.
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

// 或者
const TimerView = observer(() => {
    const [timer] = useState(() =>
        observable({
            secondsPassed: 0,
            increaseTimer() {
                this.secondsPassed++
            }
        })
    )
    return <span>Seconds passed: {timer.secondsPassed}</span>
})
// 或者
const TimerView = observer(() => {
    const timer = useLocalObservable(() => ({
        secondsPassed: 0,
        increaseTimer() {
          this.secondsPassed++
        }
  }))

    return <span>Seconds passed: {timer.secondsPassed}</span>
})
```

# 赋值要在runInAction运行 或者用generete函数
```js
  // await
  async getData() {
    try{
      const res = await fetch('https://www.marketup.cn/open/api/v1/chat/companyInfo').then(response => response.json())
      runInAction(() => {
        this.data = res.data
      })
    }catch (e) {
    }
  }

  // yield
  *getOth(): any {
    try {
      const res = yield fetch('https://www.marketup.cn/open/api/v1/chat/companyInfo').then(response => response.json())
      this.data = res.data
    } catch (error) {

    }
  }
```
