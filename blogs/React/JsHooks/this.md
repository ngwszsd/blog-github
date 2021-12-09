---
title: this指向
date: 2021-12-3
tags:
 - JsHooks
categories:
 - JS Tool
---

## 非严格模式下，函数内部的this指向window 严格模式下，为undefined
```js
function fn() {
    console.log(this);
}
fn(); // window
window.fn();
```
```js
'use strict'
function fn() {
    console.log(this);
}
fn(); // undefined
window.fn();
```

## 被嵌套的函数独立调用时，this默认指向window (foo函数this指向自己上一级的obj 下一条有eg)
```js
var obj = {
    a: 2,
    foo: function() {
        function test() {
            console.log(this); // window
        }
        test();
    }
}
obj.foo();
```

## 闭包中this默认指向window
```js
var obj3 = {
    a: 2,
    foo: function() {
        console.log(this); // obj3
        var c = this.a; // 2
        return function test() {
            console.log(this); // window
            return c;
        }
    }
}
var fn = obj3.foo();
console.log(fn()); // 2
```

## 被隐式绑定的函数丢失了绑定对象，从而默认绑定到window
```js
function foo1() {
    console.log(this); // window
}
var obj6 = {
    a: 2,
    foo: foo1
}
var bar = obj6.foo; // 在这并未执行方法
bar(); // 在这执行了方法

function foo1() {
    console.log(this); // obj6
}
var obj6 = {
    a: 2,
    foo: foo1
}
var bar = obj6.foo(); // 在这执行方法
```

## （隐式丢失）参数传递指向window | (setInterval setTimeout)指向window类似闭包
```js
function foo3(){
    console.log(this);
}
function bar1(fn) {
    // 默认赋值 fn = obj7.foo
    fn(); // window
}
var obj7 = {
    a: 1,
    foo: foo3
}
bar1(obj7.foo)

// (setInterval setTimeout)指向window类似闭包
setTimeout(function() {
    console.log(this); // window 
}, 0)
```

## 显式绑定
```js
// call和apply
var obj = {
    a:1
}
function foo() {
    console.log(this);
}
foo.call(obj); //obj
foo.apply(obj); //obj
// bind
var obj = {
    a:1
}
function foo() {
    console.log(this);
}
var fn = foo.bind(obj); 
fn() // obj
```

## new关键字来执行函数，相当于构造函数来实例化对象，则this指向当前实例化的对象
```js
function Fn() {
    console.log(this); // Fn{}
}
var fn = new Fn();
```

## callback会向上找
```js
// callback
    function foo () {
        console.log(this); // obj
        var test = () => {
            console.log(this); // obj
        }
        test();
    }
    var obj = {
        a: 1,
        foo: foo
    }
    obj.foo();
 // 普通函数
     function foo () {
        console.log(this); // obj
        function test() {
            console.log(this); // window
        }
        test();
    }
    var obj = {
        a: 1,
        foo: foo
    }
    obj.foo();   

```