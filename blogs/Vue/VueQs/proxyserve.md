---
title: vue配置proxy跨域
date: 2022-01-24
tags:
 - vue
categories:
 - Vue
---
## vue.config.js 前端端口：8080


## 不配置baseUrl
```js
// 直接配置target 那么浏览器内请求地址是 http://localhost:8080/register 相当于请求 http://127.0.0.1:1016/api/auth/register 不需要配置baseUrl 
// 配置的话会报错相当于http://127.0.0.1:1016/api/auth/api/auth/register 两次api/auth/
![](https://s3.bmp.ovh/imgs/2022/01/3d155e2c74e35920.png)
module.exports = {
    devServer: {
        proxy: {
            '/': { // 这里只能配'/'或者''  !!!!
                target: 'http://127.0.0.1:1016/api/auth',
                changeOrigin: true,
            }
        }

    }
}
```
## 配置baseUrl
```js
axios.defaults.baseURL = '/api/auth' 
```
+ 配置baseUrl 1
```js
module.exports = {
    devServer: {
        proxy: {
            '/api/auth': { // 配置baseUrl了 这里可以配'/' 或者 '' 或者'/api/auth'
                target: 'http://127.0.0.1:1016',
                changeOrigin: true,
            }
        }

    }
}
```
+ 配置baseUrl 2 
```js
module.exports = {
    devServer: {
        proxy: {
            '/api/auth': { // 配置baseUrl了 这里可以配'/' 或者 '' 或者'/api/auth'
                target: 'http://127.0.0.1:1016/api/auth',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/auth': ''
                }
            }
        }
    }
}
```
