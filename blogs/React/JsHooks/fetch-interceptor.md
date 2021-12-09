---
title: fetch-interceptor
date: 2021-11-22
tags:
 - JsHooks
categories:
 - JS Tool
---

# [fetch-interceptor](https://gitee.com/garvinew/register_login/blob/master/login/src/c_fetch.js)

```js
/**
 * c_fetch
 * 基於原生fetch封裝了攔截器功能，暴露出來的c_fetch跟原生fetch用法一致，只是增加了攔截器功能。攔截器用法參考axios的攔截器用法。
 * 攔截器: c_fetch.interceptors
 * 注意: 攔截器不攔截reject類型的response結果
 */
//定義用來存儲攔截請求和攔截響應結果的處理函數集合
let interceptors_req = [], interceptors_res = [];
// 定义header可以加根据需要添加
const headers = {
    'Content-Type': 'application/json',
    Authorization: ''

}

function c_fetch(input, init = {}) {
    init.headers = {
        ...headers
    }
    //fetch默認請求方式設為GET
    if (!init.method) {
        init.method = 'GET'
    }
    //interceptors_req是攔截請求的攔截處理函數集合
    interceptors_req.forEach(interceptors => {
        init = interceptors(init);
    })

    //在原生fetch外面封裝一個promise，為了在promise裡面可以對fetch請求的結果做攔截處理。
    //同時，保證c_fetch函數返回的結果是個promise對象。
    return new Promise(function (resolve, reject) {
        //發起fetch請求，fetch請求的形參是接收上層函數的形參
        fetch(input, init).then(res => {
            //interceptors_res是攔截響應結果的攔截處理函數集合
            interceptors_res.forEach(interceptors => {
                //攔截器對響應結果做處理，把處理後的結果返回給響應結果。
                res = interceptors(res);
            })
            //將攔截器處理後的響應結果resolve出去
            resolve(res)
        }).catch(err => {
            reject(err);
        })
    })
}

//在c_fetch函數上面增加攔截器interceptors，攔截器提供request和response兩種攔截器功能。
//可以通過request和response的use方法來綁定兩種攔截器的處理函數。
//use方法接收一個參數，參數為一個callback函數，callback函數用來作為攔截器的處理函數；
//request.use方法會把callback放在interceptors_req中，等待執行。
//response.use方法會把callback放在interceptors_res中，等待執行。
//攔截器的處理函數callback接收一個參數。
//request攔截器的callback接收的是請求發起前的config；
//response攔截器的callback接收的是網絡請求的response結果。
c_fetch.interceptors = {
    request: {
        use: function (callback) {
            interceptors_req.push(callback);
        }
    },
    response: {
        use: function (callback) {
            interceptors_res.push(callback);
        }
    }
}
c_fetch.interceptors.request.use(config => {
    const passUrl = ['api/login', 'api/register']
    if (passUrl.includes(config.url)) return config
    const tk = localStorage.getItem('@TOKEN')

    if (tk) {

        config.headers.Authorization = 'Bearer ' + tk
    } else {
        delete config.headers.Authorization
    }
    return config
})
c_fetch.interceptors.response.use(response => {
    const { msg, status } = response

    // 案例响应拦截>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (status === 500) {
        alert('响应超时 即将跳转到首页>>>>>>>>>>>>>>>>>')
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    }

    if (status === 1 && msg === 'ERROR TOKEN') {
        window.location.href = "/login";
    }
    return response
})
export default c_fetch;
```

