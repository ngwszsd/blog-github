---
title: Canvas 记录
date: 2021-12-22
tags:
 - JsHooks
categories:
 - JS Tool
---

## Canvas
- 矩形等直线形状
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Canvas 记录</title>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body style="margin: 0;padding: 0">
<canvas id="tutorial" width="300" height="300"></canvas>
<script type="text/javascript">
    function draw(){
        /**
         * 直到获取ctx上下文为canvas初始化
         * @type {HTMLElement}
         */
        const canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        const ctx = canvas.getContext("2d");

        /**
         * @矩形 x,y是坐标  width, height宽高
         * fillStyle是一个setter 设置颜色('string') eg: ctx.fillStyle = "rgb(200, 0, 0)";
         * fillRect(x, y, width, height)：绘制一个填充的矩形。
         * strokeRect(x, y, width, height)：绘制一个矩形的边框。
         * clearRect(x, y, widh, height)：清除指定的矩形区域，然后这块区域会变的完全透明。
         * @其他图形
         * beginPath() 新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径
         * moveTo(x, y) 把画笔移动到指定的坐标(x, y)。相当于设置路径的起始点坐标
         * closePath() 闭合路径之后，图形绘制命令又重新指向到上下文中
         * stroke() 通过线条来绘制图形轮廓
         * fill() 通过线条来绘制图形轮廓
         */
        ctx.beginPath(); // 新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径
        ctx.moveTo(50, 50); // moveTo(x, y)把画笔移动到指定的坐标(x, y)。相当于设置路径的起始点坐标。
        ctx.lineTo(200, 50); // lineTo(x, y)结尾坐标
        ctx.lineTo(200, 200);
        ctx.closePath(); // 闭合路径之后，图形绘制命令又重新指向到上下文中 fill()不用闭合自动绘制
        ctx.fill(); // 填充
        ctx.stroke(); //描边。stroke不会自动closePath()
    }
    draw();
</script>
</body>
</html>
```

- 圆弧（圆）
```html

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Canvas 记录</title>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body style="margin: 0;padding: 0">
<canvas id="tutorial" width="300" height="300"></canvas>
<script type="text/javascript">
    function draw(){
        /**
         * arc(x, y, r, startAngle, endAngle, anticlockwise)
         * 以(x, y) 为圆心，以r 为半径，从 startAngle 弧度开始到endAngle弧度结束。
         * anticlosewise 是布尔值，true 表示逆时针，false 表示顺时针(默认是顺时针)。
         * @type {HTMLElement}
         */
        var canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(50, 50, 40,  -Math.PI, Math.PI , false);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(150, 50, 40, 0, -Math.PI / 2, true);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(50, 150, 40, -Math.PI / 2, Math.PI / 2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(150, 150, 40, 0, Math.PI, false);
        ctx.fill();
    }
    draw();
</script>
</body>
</html>
```






