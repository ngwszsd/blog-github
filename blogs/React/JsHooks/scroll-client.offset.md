---
title: scrollWidth、clientWidth、offsetWidth的区别及总结
date: 2022-01-10
tags:
 - JsHooks
categories:
 - JS Tool
---



+ offsetWidth/offsetHeight 对象的可见宽度 元素的宽度（内容+内边距+边框+滚动条）==整体，整个控件
+ clientWidth/clientHeight 内容的可见宽度 内容+内边距,-----不包括边框和外边距、滚动条  == 可视内容
+ scrollWidth/scrollHeight 元素完整的高度和宽度，overflow:hidden的部分也计算在内。内容+内边距+溢出尺寸-----不包括边框和外边距  ==实际内容
+ offsetLeft/offsetTop 当前元素距浏览器边界的偏移量，以像素为单位。
+ clientTop/clientLeft 这个属性测试下来的结果就是border。
+ scrollLeft/scrollTop 设置或返回已经滚动到元素的左边界或上边界的像素数。

![](https://images2018.cnblogs.com/blog/998959/201809/998959-20180902162919860-911974912.png)

+ Element.offsetTop：为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部的距离。
+ Element.offsetLeft：    子元素的border与父元素border的距离 是数值
+ Element.offsetWidth ：元素的宽度（内容+内边距+边框+滚动条）===整体，实际
+ Element.offsetHeight：是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。
![](https://images2018.cnblogs.com/blog/998959/201809/998959-20180902163359933-1286477719.png)

+ Element.ScrollTop：获取或设置一个元素的内容垂直滚动的像素数（值为0即最顶部/不能被滚动）
+ Element.ScrollLeft：读取或设置元素滚动条到元素左边的距离（它>元素内容最大宽度，它就是元素最大宽度），是整数
+ Element.ScrollWidth：内容+内边距+溢出尺寸-----不包括边框和外边距  ==实际内容
+ Element.ScrollHeight：一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。
![](https://images2018.cnblogs.com/blog/998959/201809/998959-20180902203532221-1592920063.jpg)

### Event
+ event.clientX：客户区域内的水平坐标
+ event.clientY：客户区域内的垂直坐标
+ event.scrollX：鼠标指针在屏幕坐标中的水平坐标
+ event.scrollY：鼠标指针在屏幕坐标中的垂直坐标
+ event.pageX：返回相对于整个文档的左边缘单击鼠标的X（水平）坐标，包括当前不可见的文档的任何部分非标准非IE支持的
+ event.offsetX ：鼠标指针在该事件与目标节点的填充边缘之间的X坐标中的偏移量。 
+ event.offsetY：鼠标指针在该事件与目标节点的填充边缘之间的Y坐标中的偏移量。 

[拖动eg](https://itluv.me/blogs/React/JsHooks/canDrag.html)
+ startEvt = 'mousedown' 按下鼠标
+ moveEvt =  'mousemove' 移动鼠标
+ endEvt =   'mouseup'   松开鼠标
