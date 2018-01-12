## Lottery.js

🎲 A simple javascript lottery app.

[Chinese README](https://github.com/meetmore/lottery.js/blob/master/README.CN.md)

## Sponsor

<div valign="middle">
  <a href="https://www.duotai.net/?utm_source=lottery.js&utm_medium=web&utm_campaign=lottery-github">
    <img src="https://user-images.githubusercontent.com/978810/34824409-447c85e8-f709-11e7-813d-41c9e7f919fe.png" alt="多态" height="180" />
  </a>
  <a href="https://www.duohui.co/?utm_source=lottery.js&utm_medium=web&utm_campaign=lottery-github">
    <img src="https://user-images.githubusercontent.com/978810/34824476-8fc7f4ce-f709-11e7-8f53-b10fdced0038.png" height="180" alt="多会" />
  </a>
</div>

## Screenshots
![lottery-demo](https://user-images.githubusercontent.com/978810/31418459-b21d6984-adfb-11e7-8fd8-7e9fc089ccfc.gif)

## [LiveDemo ->](https://meetmore.github.io/lottery.js/)

## Features
 - Flexible
 - Out of the box
 - Interesting Animation Effects

## Usage

 Prepare data like this

```js
    [
        {
            "avatar": "//example.com/avatar_1.jpg",
            "name": "MeetMore",
            "data": {
                "title": "Front-End Developer",
                "company": "Little Apple",
                ……
            }
        },
        ……
    ]
```

 import CSS/JS

```html
    <!-- Zepto or jQuery -->
    <script src="http://zeptojs.com/zepto.min.js"></script>

    <link rel="stylesheet" href="./lottery.min.css" />
    <script src="./lottery.compact.min.js"></script>
```

 Call function and Ready to go


```js
    $.lottery({
        api:"./api.json"
    });
```

## Config


```js
    $.lottery({
        el: ".lottery",                           // where we put dom，jquery selector
        timeout: 10,                              // time to auto stop（second）
        once: true,                               // winner can not repeatable
        title: "company",                         // the title will show in winner screen data[key]
        subtitle: "title",                        // the subtitle will show in winner screen data[key]
        api: 'http://example.com/lottery.json',   // API URL
        data: {},                                 // directly use userdata object (when use this, keep api empty)
        confetti: true,                           // show confetti effects
        showbtn: true,                            // show control button
        speed: 400,                               // interval time to next candidate, the unit is ms
        number: 3                                 // how many winner will be get at one time
    });
```

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
speed | interval time to next candidate, the unit is ms  | 350 | false
number | how many winner will be get at one time  | 1 | int

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

 Parameter | Explain | Return
----|------|----
start | startLottery | true
stop | stopLottery | Object，WinnerUser's info
getUsers | get user list | Object，Userlist
winners, get | get winners list | Object，Winnerslist
winners, clean | clean ignore user who has won | true
history, show | show the history screen | true
history, get | get history lottery list | Object，Historylist
history, clean | clean history lottery list | true

**Winners will be lose after refeash page, History will be save at LocalStorage.**

## Browser Support

- Modern Browser

## License

Copyright © Duohui.co - Apache License 2.0

## Credits

- confetti.js is created by [Javier Sosa](http://jsfiddle.net/Javalsu/vxP5q/743/)
- Icons are created by [Okay: Yasir B. Eryılmaz](https://thenounproject.com/term/okay/114615/), [Crown: Pundimon](https://thenounproject.com/term/crown/1028402), [Dice: davidyu](https://thenounproject.com/term/dice-point-4/1250653/) from the Noun Project
- Move.js is created by [TJ Holowaychuk](https://visionmedia.github.io/move.js/)
