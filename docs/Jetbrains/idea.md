---
title: 牛逼 --->>> jetbrains全家桶最新版激活(idea自定义到期时间！！！)
date: 2022-01-04
tags:
 - Idea
categories: 
 - Idea
---

### 下载链接 V1.2
+ [123pan](https://www.123pan.com/s/SYyA-DJJ3A)
+ [lanzou](https://ngw.lanzout.com/itK8pyd1fqj)
+ [Onedrive](https://utler-my.sharepoint.com/:u:/g/personal/ngw_t_edu_vn/ERzsvMPMD7RGvMkVnoJArhoBIC7zzkhnbcN-MWsdAXRFaQ?e=bghfZI)

### Step
+ 显示包内容进入 Content/bin/idea.vmoptions
添加一条（/Users/osx/ja-netfilter/ja-netfilter.jar替换自己的插件绝对路径）
```js
-javaagent:/Users/osx/ja-netfilter/ja-netfilter.jar
```
![](https://cdn.jsdelivr.net/gh/ngwszsd/cdn/mac-img/idea-find.png)

janf_config.txt配置

```js
// licenseeName：被许可人姓名，也就是Licensed to xxx里的xxx信息；
// gracePeriodDays：宽限期；
// paidUpTo：激活的时长，2222-12-31的配置；
[DNS]
EQUAL,jetbrains.com

[URL]
PREFIX,https://account.jetbrains.com/lservice/rpc/validateKey.action

[MyMap]
EQUAL,licenseeName->garvin
EQUAL,gracePeriodDays->30
EQUAL,paidUpTo->2222-12-31

```
### [原作者zhile.io](https://zhile.io/2021/11/29/ja-netfilter-javaagent-lib.html)
