---
title: vue配置proxy跨域 或者后端配置跨域golang
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

### 后端配置跨域golang
+ CORSMiddleware.go 中间件
```go
package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
		ctx.Writer.Header().Set("Access-Control-Max-Age", "86400")
		ctx.Writer.Header().Set("Access-Control-Allow-Method", "*")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if ctx.Request.Method == http.MethodOptions {
			ctx.AbortWithStatus(200)
		} else {
			ctx.Next()
		}
	}
}

```
+ routes.go
```go
package main

import (
	"github.com/gin-gonic/gin"
	"itluv.me/ginessential/controller"
	"itluv.me/ginessential/middleware"
)

func CollectRoute(r *gin.Engine) *gin.Engine {
	r.Use(middleware.CORSMiddleware()) // 使用中间件 ！！！
	r.GET("/", controller.TestGet)
	r.POST("/api/auth/register", controller.Register)
	r.POST("/api/auth/login", controller.Login)
	r.GET("/api/auth/info", middleware.AuthMiddleware(), controller.Info)
	return r
}

```