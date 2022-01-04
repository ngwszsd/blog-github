---
title: 防抖節流hook
date: 2021-01-03
tags:
 - React QS
categories:
 - React
---

# 防抖節流hook js

```js
import { useRef, useCallback, useEffect } from "react";
/**
 * 防抖hook
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} dep 
 */
export function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
}

/**
 * 节流hook
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} dep 
 */
export function useThrottle(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}

```
# ts
```ts
/**
 * 防抖hook
 * @param {*} fn
 * @param {*} delay
 * @param {*} dep
 * like Await in limit seconds
 */
export function useDebounce(fn: any, delay: any, dep = []): any {
  const { current }: any = useRef({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function f(this: any, ...args: any[]): any {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = window.setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
}

/**
 * 節流hook
 * @param {*} fn
 * @param {*} delay
 * @param {*} dep
 * handle click more times in limit seconds
 */

export function useThrottle(fn: any, delay: any, dep = []) {
  const { current }: any = useRef({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function f(this: any, ...args: any[]) {
    if (!current.timer) {
      current.timer = window.setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}
```
