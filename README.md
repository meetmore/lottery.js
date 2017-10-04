## 多会抽奖屏幕

🎲 一个简单的抽奖屏幕，基于Zepto或jQuery，支持各种自定义姿势，快速便捷接入现有系统。

[ENGLISH README](https://github.com/meetmore/lotteryScreen/blob/master/README.EN.md)  

## 预览
![Preview](https://i.loli.net/2017/10/04/59d4a18ec058b.gif) 

LiveDemo->  
 [https://meetmore.github.io/lotteryScreen/index.html](https://meetmore.github.io/lotteryScreen/index.html)
   
## 特性
 - 灵活的使用方法
 - 可定制的自定义信息
 - 风趣的小特效
   
## 使用

 准备一个科学的API
 
    [
        {
            "avatar": "//example.com/avatar_1.jpg",  //头像图片地址
            "name": "李狗蛋",                         //名字
            "data": {                                //该用户额外数据
                "所在公司": "英国可厉害了科技有限公司",
                "你的职业": "产品喵",
                "豆腐脑吃甜吃咸": "咸党",
                ……
            }
        },
        ……
    ]

 引入CSS和JS，预留一个div.lottery

    <!-- Dom here! -->
    <div class="lottery"></div>

    <!-- Zepto or jQuery -->
    <script src="http://zeptojs.com/zepto.min.js"></script>

    <!-- 库 -->
    <script src="./js/move.min.js"></script>
    <script src="./js/confetti.js"></script>

    <!-- 本体 -->
    <link rel="stylesheet" href="./css/lottery.css" />
    <script src="./js/lottery.js"></script>

Ready to go

    $.lottery({ 
        api:"./api.json" 
    });
  
## 参数
  
    $.lottery({ 
        timeout: 10,                              //抽奖自动停止时间（秒）
        once: true,                               //每人只能中奖一次（防止重复中奖）
        title: "你的职业",                         //中奖界面显示的标题 data[key]
        subtitle: "所在公司",                      //中奖界面显示的副标题 data[key]
        api: 'http://example.com/lottery.json',   //API地址
        data: {},                                 //直接传入用户对象（直接传入时请不要使用api参数）
        confetti: true,                           //中奖时候显示小彩带动画
        showbtn: true                             //显示抽奖控制按钮
    });
  
 参数 | 说明 | 默认值 | 可选值
----|------|----|----
timeout | 抽奖自动停止时间（秒）  | null | 10（整数，秒）
once | 每个人只能抽取一次（不可重复中奖）  | false | true - 启用
title | 中奖界面显示的标题  | 用户name属性 | user['data'][**key**]（附加数据属性中key内容）
subtitle | 中奖界面显示的副标题  | 用户company属性 | user['data'][**key**]（附加数据属性中key内容）
api | 传入一个抽奖用户地址，json格式  | null | URL
data | 直接传入用户对象（直接传入时请不要使用api参数）  | null | Object
confetti | 中奖时候显示小彩带动画（如果这里不启用，可以不引入confetti.js）  | true | false
showbtn | 是否显示抽奖控制按钮  | true | false
  
## API

    $.lottery('start'); //开始抽奖
    $.lottery('stop'); //停止抽奖
    $.lottery('getUsers'); //获取用户列表
    $.lottery('getWinners'); //获取中奖用户列表

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
