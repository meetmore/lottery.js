## Lottery.js

🎲 一个简单的 JavaScript 抽奖应用，基于 Zepto 或 jQuery，快速便捷接入现有系统。

[English README](https://github.com/meetmore/lottery.js/blob/master/README.md)

## 赞助商

- [多会](https://www.duohui.co/?utm_source=lottery.js&utm_medium=web&utm_campaign=lottery-github)

## 预览
![lottery-demo](https://user-images.githubusercontent.com/978810/31418459-b21d6984-adfb-11e7-8fd8-7e9fc089ccfc.gif)

## [LiveDemo ->](https://meetmore.github.io/lottery.js/)

## 特性
 - 灵活的使用方法
 - 可定制的自定义信息
 - 风趣的小特效

## 使用

准备一个参与抽奖者的数据

 ```js
    [
        {
            "avatar": "//example.com/avatar_1.jpg",    // 头像图片地址
            "name": "MeetMore",                        // 名字
            "data": {                                  // 该用户额外数据
                "company": "MeetMore Inc.",
                "title": "CEO",
                ...
            }
        },
        ……
    ]
```

在页面中引入 CSS 和 JS

```html
    <!-- Zepto or jQuery -->
    <script src="http://zeptojs.com/zepto.min.js"></script>

    <link rel="stylesheet" href="./lottery.min.css" />
    <script src="./lottery.compact.min.js"></script>
```

Ready to go

```js
    $.lottery({
        api:"./api.json"
    });
```

## 参数

```js
    $.lottery({
        el: ".lottery",                           // 在哪里输出抽奖的dom，使用jquery选择器
        timeout: 10,                              // 抽奖自动停止时间（秒）
        once: true,                               // 每人只能中奖一次（防止重复中奖）
        title: "company",                         // 中奖界面显示的标题 data[key]
        subtitle: "title",                        // 中奖界面显示的副标题 data[key]
        api: "http://example.com/lottery.json",   // 抽奖者数据 API 地址（非必填，若填写则 data 参数将被忽略）
        data: [],                                 // 直接传入抽奖者数据
        confetti: true,                           // 中奖时候显示小彩带动画
        showbtn: true,                            // 显示抽奖控制按钮
        speed: 400,                               // 随机到下一个参与者的间隔时间，单位毫秒
        number: 3                                 // 每轮的中奖人数
    });
```

 参数 | 说明 | 默认值 | 可选值
----|------|----|----
el | 在哪里输出抽奖的dom  | body | 使用jquery选择器，例如”.lottery“
timeout | 抽奖自动停止时间（秒）  | null | 10（整数，秒）
once | 每个人只能抽取一次（不可重复中奖）  | false | true - 启用
title | 中奖界面显示的标题  | 用户name属性 | user['data'][**key**]（附加数据属性中key内容）
subtitle | 中奖界面显示的副标题  | 用户company属性 | user['data'][**key**]（附加数据属性中key内容）
api | 传入一个抽奖用户地址，json格式  | null | URL
data | 直接传入用户对象（直接传入时请不要使用api参数）  | null | Object
confetti | 中奖时候显示小彩带动画（如果这里不启用，可以不引入confetti.js）  | true | false
showbtn | 是否显示抽奖控制按钮  | true | false
speed | 随机到下一个参与者的间隔时间，单位毫秒  | 350 | false
number | 一次抽出多少名中奖 | 1 | int

## API

```js
    $.lottery('start');
    $.lottery('stop');
    $.lottery('getUsers');
    $.lottery('winners', 'get');
    $.lottery('winners', 'clean');
    $.lottery('history', 'show');
    $.lottery('history', 'get');
    $.lottery('history', 'clean');
```

 参数 | 说明 | 返回
----|------|----
start | 开始抽奖 | true
stop | 停止抽奖 | Object，中奖用户信息
getUsers | 获取用户列表 | Object，用户列表
winners, get | 获取中奖用户列表 | Object，中奖用户列表
winners, clean | 清空已中奖用户信息（将已中奖者放回奖池） | true
history, show | 显示抽奖历史 | true
history, get | 获取抽奖历史 | Object，抽奖历史
history, clean | 清空抽奖历史 | true

**中奖用户会在刷新页面后清空，抽奖历史会被储存在LocalStorage中不会被清空**

## 浏览器支持

- 现代浏览器

## 许可证

Copyright © Duohui.co - Apache License 2.0

## Credits

- confetti.js is created by [Javier Sosa](http://jsfiddle.net/Javalsu/vxP5q/743/)
- Icons are created by [Okay: Yasir B. Eryılmaz](https://thenounproject.com/term/okay/114615/), [Crown: Pundimon](https://thenounproject.com/term/crown/1028402), [Dice: davidyu](https://thenounproject.com/term/dice-point-4/1250653/) from the Noun Project
- Move.js is created by [TJ Holowaychuk](https://visionmedia.github.io/move.js/)
