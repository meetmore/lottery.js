## MeetMore lotteryScreen

🎲 A h5 lottery screen that easy to use, base on Zepto or jQuery, with custom fields spport.

[Chinese README](https://github.com/meetmore/lotteryScreen/blob/master/README.md)  

## 预览
![Preview](https://i.loli.net/2017/10/04/59d4a18ec058b.gif) 

LiveDemo->  
 [https://meetmore.github.io/lotteryScreen/index.html](https://meetmore.github.io/lotteryScreen/index.html)
   
## Features
 - Flexible
 - Custom Fields
 - Interesting Animation Effects
   
## Usage

 Prepare an API like this
 
    [
        {
            "avatar": "//example.com/avatar_1.jpg", 
            "name": "MeetMore",
            "data": {
                "YourJob": "Front-End Developer",
                "Company": "xx Unoion Company",
                ……
            }
        },
        ……
    ]

 import CSS/JS

    <!-- Zepto or jQuery -->
    <script src="http://zeptojs.com/zepto.min.js"></script>

    <!-- import other resources -->
    <script src="./js/move.min.js"></script>
    <script src="./js/confetti.js"></script>

    <link rel="stylesheet" href="./css/lottery.css" />
    <script src="./js/lottery.js"></script>

 Call function and Ready to go

    $.lottery({ 
        api:"./api.json" 
    });
  
## Config
  
    $.lottery({ 
        el: ".lottery",                           //where we put dom，jquery selector
        timeout: 10,                              //time to auto stop（second）
        once: true,                               //winner can not repeatable
        title: "YourJob",                         //the title will show in winner screen data[key]
        subtitle: "Company",                      //the subtitle will show in winner screen data[key]
        api: 'http://example.com/lottery.json',   //API URL
        data: {},                                 //directly use userdata object (when use this, keep api empty)
        confetti: true,                           //show confetti effects
        showbtn: true,                            //show control button
        fitsize: true                             //show all user in one screen
    });
  
 Parameter | Explain | Default | Optional
----|------|----|----
el | where we put dom  | body | jquery selector，e.g.”.lottery“
timeout | time to auto stop（second）  | null | 10 (int，second)
once | winner can not repeatable  | false | true (enable)
title | the title will show in winner screen  | user['name'] | user['data'][**key**] (key content in data fields)
subtitle | the subtitle will show in winner screen  | user['company'] | user['data'][**key**] (key content in data fields)
api | API JSON URL  | null | URL
data | directly use userdata object (when use this, keep api empty)  | null | Object
confetti | show confetti effects (if disable, confetti.js is not required)  | true | false
showbtn | show control button  | true | false
fitsize | fit user avatar size to show all user in one screen  | true | false
  
## API

    $.lottery('start'); 
    $.lottery('stop');
    $.lottery('getUsers'); 
    $.lottery('getWinners');

 Parameter | Explain | Return
----|------|----
start | startLottery | true
stop | stopLottery | Object，WinnerUser's info
getUsers | get user list | Object，Userlist
getWinners | get winners list | Object，Winnerslist

## Browser Support

- Modern Browser
   
## License

- Apache License 2.0
