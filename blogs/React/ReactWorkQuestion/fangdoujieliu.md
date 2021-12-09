---
title: 防抖節流hook
date: 2021-11-18
tags:
 - React QS
categories:
 - React
---

# 防抖節流hook

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

