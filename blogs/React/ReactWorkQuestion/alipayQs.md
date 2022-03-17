---
title: 跳转支付宝支付的适合如何处理
date: 2022-03-17
tags:
 - React QS
categories:
 - React
---

+ 这是支付宝返回的代码 接下来如何运行
```html
<form id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do?charset=UTF-8' method='POST'>
    <input type='hidden' name='biz_content'
           value='{"body":"\u652f\u4ed8\u5b9d\u5145\u503c","subject":"\u8bc1\u5b9d\u5b9d-WEB\u7aef\u652f\u4ed8\u5b9d\u5145\u503c(1\u5143)","out_trade_no":"20170827mK8vqssEAGanbdei","timeout_express":"30m","total_amount":1,"product_code":"FAST_INSTANT_TRADE_PAY"}'/><input
        type='hidden' name='app_id' value='2016091301899737'/><input type='hidden' name='version' value='1.0'/><input
        type='hidden' name='format' value='json'/><input type='hidden' name='sign_type' value='RSA2'/><input
        type='hidden' name='method' value='alipay.trade.page.pay'/><input type='hidden' name='timestamp'
                                                                          value='2017-08-27 14:12:15'/><input
        type='hidden' name='alipay_sdk' value='alipay-sdk-php-20161101'/><input type='hidden' name='notify_url'
                                                                                value='https://keensting.fa123.com/open/alipay/app/listener'/><input
        type='hidden' name='return_url' value='https://www.baidu.com'/><input type='hidden' name='charset'
                                                                              value='UTF-8'/><input type='hidden'
                                                                                                    name='sign'
                                                                                                    value='lSk75QEwYbxK3hIRcgAfv2A++rZef7sVRGqMQLo2O5KWzCuiXnd0As4FPyNiK1Q0lcUUGvrog3Loyzk0ChEvg8QBsFeAaNjjPp3WaQFUTIfv+JC6s2GoWdFiAgS+oBRsZg0piDu7nP7UYXJyi/VLxaxKSbQhKbWeTSD3ATFiApxLP7HeA81snUQ8fpL04DJjegS4KKZvvsAHUOza071T9LgzB/9EuquFUXNyVYSPutlGFRJj8RLyVRNJmsUYsWgXW5tGD9SEvdcuYosiiREugbOssX+nPacsT6gFzw4IWSnfGZNEutoPidWxwCk4Ai1dZtrY1FfkeuajNoIvd2IBjw=='/><input
        type='submit' value='ok' style='display:none;''>
</form>
<script>document.forms['alipaysubmit'].submit();</script>
```

```js
        const div = document.createElement('div');
        // res.data是上方返回的代码
        div.innerHTML = res.data; // html code
        document.body.appendChild(div);
        document.forms.alipaysubmit.submit();
```
