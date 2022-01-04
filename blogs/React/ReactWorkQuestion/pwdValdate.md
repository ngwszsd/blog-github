---
title: 密码验证 8-20位，数字、大小字母、特殊字符至少三种!
date: 2021-01-03
tags:
 - React QS
categories:
 - React
---

```ts
/**
 * 密码验证 8-20位，数字、大小字母、特殊字符至少三种!
 * @param string
 */
export function checkPwd(pwd: string) {
  let check = 0;
  for (let i = 0; i < pwd.length; i++) {
    let c = pwd[i].charCodeAt();
    if (c < 33 || c > 126) {
      return false;
    }
    if (c >= 65 && c <= 90) {
      check = check | (1 << 0);
    } else if (c >= 97 && c <= 122) {
      check = check | (1 << 1);
    } else if (c >= 48 && c <= 57) {
      check = check | (1 << 2);
    } else {
      check = check | (1 << 3);
    }
  }
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if ((check & (1 << i)) > 0) {
      count++;
    }
  }
  return count >= 3;
}
```

