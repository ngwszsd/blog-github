---
title: div可随意拖动 + 浏览器判断
date: 2021-11-18
tags:
 - JsHooks
categories:
 - JS Tool
---

# div可随意拖动 

```js
    const os = () => {
        const ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isChrome = /(?:Chrome|CriOS)/.test(ua),
            isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
            isIPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isIPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isIPhone: isIPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };
    };

    window.onload = () => {
        dragAny('dragId', '')
    }

    const dragAny = (dragId, dragLink) => {
        // 获取元素
        const drag = document.getElementById(dragId)
        drag.style.position = 'fixed'
        drag.style.cursor = 'move'
        drag.style.zIndex = '100'
        // 标记是拖曳还是点击
        let isClick = true
        let disX, disY, left, top, starX, starY
        // 页面touchmove处理函数 让滚动时元素不动
        const scrollFunc = function (e) {
            drag.style.position = 'fixed'
            drag.style.left = drag.offsetLeft
            drag.style.top = drag.offsetTop
        }
        //给页面绑定touchmove滚动事件 移动端
        if (document.addEventListener) {
            document.addEventListener('touchmove', scrollFunc, false)
        }
        //滚动滑轮触发scrollFunc方法  //ie 谷歌
        window.onmousewheel = document.onmousewheel = scrollFunc

        let startEvt, moveEvt, endEvt
        // 判断设备
        if (os().isAndroid || os().isIPhone) {
            startEvt = 'touchstart'
            moveEvt = 'touchmove'
            endEvt = 'touchend'
        } else {
            startEvt = 'mousedown'
            moveEvt = 'mousemove'
            endEvt = 'mouseup'
        }

        drag.addEventListener(startEvt, function (e) {
            // 阻止页面的滚动，缩放
            e.preventDefault()
            // 兼容IE浏览器 只能var
            var e = e || window.event
            isClick = true
            // 手指按下时的坐标
            starX = e.touches ? e.touches[0].clientX : e.clientX
            starY = e.touches ? e.touches[0].clientY : e.clientY
            // 手指相对于拖动元素左上角的位置
            disX = starX - drag.offsetLeft
            disY = starY - drag.offsetTop
            // 按下之后才监听后续事件
            document.addEventListener(moveEvt, moveFun)
            document.addEventListener(endEvt, endFun)
        })

        // touchmove/mousemove处理函数
        function moveFun(e) {
            // 兼容IE浏览器
            var e = e || window.event
            // 防止触摸不灵敏，拖动距离大于20像素就认为不是点击，小于20就认为是点击跳转
            if (Math.abs(starX - (e.touches ? e.touches[0].clientX : e.clientX)) > 20 || Math.abs(starY - (e.touches ? e.touches[0].clientY : e.clientY)) > 20) {
                isClick = false
            }
            left = (e.touches ? e.touches[0].clientX : e.clientX) - disX
            top = (e.touches ? e.touches[0].clientY : e.clientY) - disY
            // 限制拖拽的X范围，不能拖出屏幕
            if (left < 0) {
                left = 0
            } else if (
                left > document.documentElement.clientWidth - drag.offsetWidth
            ) {
                left = document.documentElement.clientWidth - drag.offsetWidth
            }
            // 限制拖拽的Y范围，不能拖出屏幕
            if (top < 0) {
                top = 0
            } else if (
                top > document.documentElement.clientHeight - drag.offsetHeight
            ) {
                top = document.documentElement.clientHeight - drag.offsetHeight
            }
            drag.style.left = left + 'px'
            drag.style.top = top + 'px'
        }

        function endFun() {
            document.removeEventListener(moveEvt, moveFun)
            document.removeEventListener(endEvt, endFun)
            isClick ? window.location.href = dragLink : () => {}
        }
    }

```

