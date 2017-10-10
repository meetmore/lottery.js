## 多会抽奖屏幕

🎲 一个简单的抽奖屏幕，基于Zepto或jQuery，支持各种自定义姿势，快速便捷接入现有系统。

[ENGLISH README](https://github.com/meetmore/lotteryScreen/blob/master/README.EN.md)  

## 预览
![lottery-demo](https://user-images.githubusercontent.com/978810/31385319-78291854-ad88-11e7-895e-2b54a3819a6b.gif)

## [LiveDemo ->](https://meetmore.github.io/lotteryScreen/)
   
## 特性
 - 灵活的使用方法
 - 可定制的自定义信息
 - 风趣的小特效
   
## 使用

准备一个参与抽奖者的数据

 ```json
    [
        {
            "avatar": "//example.com/avatar_1.jpg",  // 头像图片地址
            "name": "MeetMore",                         // 名字
            "data": {                                //该用户额外数据
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
        title: "你的职业",                         // 中奖界面显示的标题 data[key]
        subtitle: "所在公司",                      // 中奖界面显示的副标题 data[key]
        api: "http://example.com/lottery.json",   // 抽奖者数据 API 地址（非必填，若填写则 data 参数将被忽略）
        data: [],                                 // 直接传入抽奖者数据
        confetti: true,                           // 中奖时候显示小彩带动画
        showbtn: true,                            // 显示抽奖控制按钮
        fitsize: true                             // 根据屏幕大小自动调整头像大小
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
fitsize | 尽可能在一屏中显示所有抽奖者  | true | false
  
## API

```js
    $.lottery('start'); // 开始抽奖
    $.lottery('stop'); // 停止抽奖
    $.lottery('getUsers'); // 获取用户列表
    $.lottery('getWinners'); // 获取中奖用户列表
```

 参数 | 说明 | 返回
----|------|----
start | 开始抽奖 | true
stop | 停止抽奖 | Object，中奖用户信息
getUsers | 获取用户列表 | Object，用户列表
getWinners | 获取中奖用户列表 | Object，中奖用户列表

## 浏览器支持

- 现代浏览器
   
## 许可证

- Apache License 2.0

## Credits

- confetti.js is created by [Javier Sosa](http://jsfiddle.net/Javalsu/vxP5q/743/)
- Icons are created by [Okay: Yasir B. Eryılmaz](https://thenounproject.com/term/okay/114615/), [Crown: Pundimon](https://thenounproject.com/term/crown/1028402), [Dice: davidyu](https://thenounproject.com/term/dice-point-4/1250653/) from the Noun Project
- Move.js is created by [TJ Holowaychuk](https://visionmedia.github.io/move.js/)