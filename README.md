# Basic MVVM Framework

一个拥有简单指令和基本功能的MVVM前端框架。

## How to Use 如何使用

clone下项目,找到dist文件夹,其中的optimus.js就是目标文件。

在HTML中引入这个js文件。以下是在bootstrap下的一个使用demo。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MVVM Demo</title>
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/demo.css" rel="stylesheet">
</head>
<body>
    <div class="container" pt-controller="mainCtrl">
        <form class="form-horizontal first-line">
            <div class="form-group">
                <label class="col-sm-2 control-label" for="examDataBinding">数据绑定</label>
                <div class="col-sm-10">
                    <input id="examDataBinding" class="form-control" type="text" placeholder="输入一些文本" pt-model="info">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">您输入的是</label>
                <div class="col-sm-10">
                    <p class="form-control-static" pt-bind="info"></p>
                </div>
            </div>
        </form>
    </div>
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="dist/optimus.js"></script>
    <script src="js/demo.js"></script>
</body>
</html>
```

其中optimus.js即为框架文件,在demo.js中启动框架即可。

```javascript
Provider.controller('mainCtrl', function ($scope) {
    $scope.info = '';
});

// start the engine
Provider.bootstrap();
```

## Directives 指令

目前支持指令有:
-----------------------------------------------------------
指令名称           | 说明
----------------- | ---------------------------------------
pt-controller    | 说明controller的作用范围
----------------- | ---------------------------------------
pt-bind          | 绑定变量到指定HTML标签中显示数据
----------------- | ---------------------------------------
pt-model         | 将输入值绑定到变量中
------------------|----------------------------------------

## Supports 支持

To Be Continued!