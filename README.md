# Basic MVVM Framework

一个拥有简单指令和基本功能的MVVM前端框架。

这是学习MVVM Front-end框架过程中做的一个Demo, 基本是顺着Angular做下来的, 还有很多指令待完成。

项目是用模块化方式写的,用require.js来管理项目模块依赖。

**DO NOT USE IT in PRODUCTION**

## How to Use 如何使用

可以在build后直接在dist文件夹中找到optimus_dist.js, 这样会暴露出来一个`OPTIMUS`作为API。

build方法:

`grunt dev`, 会直接build `optimus_dist.js`到dist文件夹中。

使用方法:

HTML中引入optimus_dist.js, 然后再继续写js就可以了。

```javascript
OPTIMUS.controller('mainCtrl', function ($scope) {
    // Codes Here!
    ...
});

// start the engine
OPTIMUS.bootstrap();
```

如果是模块化开发, 不想直接使用, 则clone项目, src文件夹下的即为代码。

clone后先`bower install`安装第三方lib等,再`npm install`安装grunt的依赖。

## Codes 代码结构

```javascript
.
├── Gruntfile.js             // Grunt配置文件
├── dist                     // Build 之后的目标文件夹
├── demo.html                // Demo html
├── css                      // Demo 的css文件夹
│   └── demo.css
├── js                       // Demo 的js文件夹
│   ├── config.js            // 用require.js的配置入口文件
│   ├── demo.js              // 普通模式下的demo的javascript文件
│   └── demo_require.js      // require.js下的demo的javascript文件
└── src
     ├── OPTIMUS.js                 // 项目入口文件, 负责注册、调用和获取指令。
     ├── DOMCompiler.js             // DOM操作器, 遍历DOM并存储DOM中的各个指令。
     ├── directives                 // 各个指令
     │   ├── directivesLoader.js    // 指令装载的文件, 负责将各个指令初始化。
     │   ├── click.js
     │   ├── controller.js
     │   └── ...
     └── scope.js             // scope是作用域, 负责给每个指令进行作用域分配。

```

## Example 示例

项目中的demo.html可能会有更新。

在HTML中引入这个optimus_dist.js文件。以下是在bootstrap下的一个使用demo, 所以会有jquery等不必要的引用。

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
    <script src="dist/optimus_dist.js"></script>
    <script src="js/demo.js"></script>
</body>
</html>
```

其中optimus.js即为框架文件,在demo.js中启动框架即可。

```javascript
OPTIMUS.controller('mainCtrl', function ($scope) {
    $scope.info = '';
});

// start the engine
OPTIMUS.bootstrap();
```

## Directives 指令

目前支持指令有:

指令名称          | 说明
---------------- | ----------------------------------
pt-controller    | 说明controller的作用范围
pt-bind          | 绑定变量到指定HTML标签中显示数据
pt-model         | 将输入值绑定到变量中
pt-click         | click事件绑定
pt-show          | 根据变量值来显示当前标签
pt-hide          | 根据变量值来隐藏当前标签

## Supports 支持

To Be Continued!