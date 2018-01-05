(function () {
  var settings = {};
  var lotteryBoxEl;
  var defaultOptions = {
    timeout: null,
    once: false,
    title: "name",
    subtitle: null,
    api: null,
    confetti: true,
    showbtn: true,
    el: "body",
    speed: 350,
    data: {},
    winners: [],
    winnerList: [],
    winnerHistory: [],
    number: 1,
    _round: 0,
    $el: null
  }

  var avatarOptions = {
    shape: 'circle',
  }

  var profileEls = {}
  var itemSideSize;
  var diceIconHtml = "<i class='dh-icon dh-icon-dice'>🎲<svg><use xlink:href='#dh-dice'/></svg></i>"
  var saveIconHtml = "<i class='dh-icon dh-icon-dice'>💾<svg><use xlink:href='#dh-save'/></svg></i>"
  var okayIconHtml = "<i class='dh-icon dh-icon-okay'>👌<svg><use xlink:href='#dh-okay'/></svg></i>"
  var crownIconHtml = "<i class='dh-icon dh-icon-crown'>👑<svg><use xlink:href='#dh-crown'/></svg></i>"

  //生成dom
  var initDom = function(dom){
    var svgIcons = $("\
      <svg xmlns='http://www.w3.org/2000/svg' style='display: none;'>\
        <symbol id='dh-okay' viewBox='0 0 57 92'>\
          <path fill='currentColor' fill-rule='nonzero' d='M3.6 51c2.5-1 5.2.3 6.2 2.7 1.3 3.5 4.6 5.8 8.3 5.8 5 0 9.2-4 9.2-9s-4-9-9-9c-3.8 0-7 2.2-8.4 5.6C8.8 49.7 6 51 3.6 50c-2.4-1-3.6-3.7-2.6-6C3.8 36.4 10.5 32 18 32c3.5 0 6.7 1 9.5 2.5l-8.8-22c-1-2.5.3-5.2 2.7-6.2 2.4-1 5.2.3 6 2.7L37 32.4 33.4 6.2c-.3-2.5 1.5-5 4-5.3 2.7-.4 5 1.4 5.4 4L46 29.7l1-11c.2-2.7 2.5-4.7 5-4.4 2.7.2 4.7 2.5 4.4 5l-3.6 41-4 30.8h-29l4.8-23.3c-2 .8-4.2 1.2-6.5 1.2C10.6 69 4 64.2 1 57c-1-2.4.2-5.2 2.6-6z'/>\
        </symbol>\
        <symbol id='dh-crown' viewBox='0 0 88 81'>\
          <path fill='currentColor' fill-rule='nonzero' d='M83 23c-2.6 0-4.8 2.3-4.8 5 0 1.6.8 3 2 4L69.6 48.2l-4-27.8c2.5-.3 4.3-2.3 4.3-4.7 0-2.7-2.2-4.8-4.8-4.8-2.7 0-4.8 2-4.8 4.8 0 2 1.3 3.8 3 4.4l-8 22-9.8-32c2-.6 3.4-2.4 3.4-4.6C48.8 3 46.6.8 44 .8c-2.6 0-4.8 2.2-4.8 4.8 0 2.2 1.4 4 3.4 4.6l-9.8 32-8-22c1.8-.6 3-2.4 3-4.4 0-2.7-2-4.8-4.7-4.8-2.6 0-4.7 2-4.7 4.8 0 2.4 1.8 4.3 4 4.7l-3.8 27.8-11-16.5c1.4-.8 2.3-2.3 2.3-4C9.8 25.2 7.6 23 5 23 2.4 23 .2 25.2.2 27.8c0 2.7 2.2 4.8 4.8 4.8.4 0 .8 0 1.2-.2l9.7 41s18.6-1.6 28-1.6c9.4 0 28 1.6 28 1.6L82 32.6H83c2.6 0 4.8-2 4.8-4.7s-2.2-5-4.8-5zM26 62.7c-2 0-3.6-1.6-3.6-3.5 0-2 1.6-3.5 3.6-3.5s3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6zm18 2.2c-3.2 0-5.8-2.5-5.8-5.7 0-3 2.6-5.7 5.8-5.7 3.2 0 5.8 2.6 5.8 5.8 0 3.3-2.6 5.8-5.8 5.8zm18-2.2c-2 0-3.6-1.6-3.6-3.5 0-2 1.6-3.5 3.6-3.5s3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6z'/>\
        </symbol>\
        <symbol id='dh-dice' viewBox='0 0 90 76'>\
          <path fill='currentColor' fill-rule='nonzero' d='M83.6 34.5c-1-.4-2.2 0-2.6 1-.4 1 0 2.3 1 2.7 4.4 1.7 4 3.2 3.6 4-.5 1.8-5.8 4-12.7 5.3l8.7-15.2c1.7-3 .7-6.7-2.3-8.4L39.7 1c-3-1.8-6.7-.7-8.5 2.2L10.8 38.6c-4.4-1.4-6.6-3-6.6-4 0-2 2.6-4.3 9.8-6 1-.2 1.8-1.3 1.6-2.4-.3-1-1.4-1.8-2.4-1.5C1.8 27.3.2 32 .2 34.5c0 7 14 9.5 21.7 10.4 0-.2 0-.3-.2-.5-.8-3 1-6 4-6.7 2.8-.8 5.8 1 6.6 4 .8 2.8-1 5.8-4 6.6-2 .6-4.3-.3-5.6-2-.5.5-1 .8-1.8.7-5.4-.4-9.8-1.3-13.3-2.4-.6 2.6.5 5.4 3 6.8l38.8 22.4s2.4 1.6 4.2 1.6c1.8 0 3.4-1.6 3.4-1.6.8-.4 1.3-1 1.7-1.8l10-17.2-6.3.3c-1 0-2-.6-2-1.5-.2-.2-.2-.4-.2-.6 9-.3 27-2.8 29.3-9.5 1-2.7.6-6.5-6-9zm-48-13.7c-1-3 1-6 3.8-6.7 3-.7 6 1 6.7 4 1 3-1 6-3.8 6.7-3 .7-6-1-6.7-4zm15 40.3c-3 1-6-.8-6.7-3.7-1-3 1-6 3.8-6.7 3-.8 6 1 6.7 3.8.8 3-1 6-4 6.7zm13.7-23.6c-3 .8-6-1-6.7-4-.8-2.8 1-5.8 4-6.6 2.8-.7 5.8 1 6.6 4 .8 2.8-1 5.8-4 6.6z'/>\
        </symbol>\
        <symbol id='dh-save' viewBox='-4 -4 32 32'>\
          <path fill='currentColor' fill-rule='nonzero' d='M19 11h-14v-2h14v2zm0 2h-14v2h14v-2zm0 4h-14v2h14v-2zm3-11v16h-20v-16h20zm2-6h-24v24h24v-24z'/>\
        </symbol>\
      </svg>\
    ");

    var isAppleOs = navigator.platform && (navigator.platform.toLowerCase().indexOf('mac') >= 0 || /iPad|iPhone|iPod/.test(navigator.platform) );
    // isAppleOs = false
    lotteryBoxEl = $("\
      <div class='dh-lottery" + (isAppleOs ? ' is-mac': '') + "'></div>\
    ");
    //中奖用户高亮
    var selectorbox = $("\
      <div id='dh-lottery-selector' style='display: none'>\
      </div>\
    ");
    //用户列表容器
    var container = $("\
      <div class='main-container'>\
        <canvas id='dh-confetti-canvas'></canvas>\
        <div class='userlist columns is-multiline is-mobile'></div>\
      </div>\
    ");
    //控制按钮
    var btn = $("\
      <div class='actions'>\
        <a class='button primary' id='dh-history-show'>" + saveIconHtml + "</a>\
        <a class='button primary' id='dh-lottery-go'>" + diceIconHtml + "</a>\
      </div>\
    ");
    //中奖用户展示弹框
    var modal = $("\
      <div class='dh-animated dh-modal" + (isAppleOs ? ' is-mac': '') + "' id='dh-lottery-winner'>\
        <div class='dh-modal-background'></div>\
        <div class='dh-modal-content'>\
        </div>\
        <button class='dh-modal-close'></button>\
      </div>\
    ");
    //历史中奖用户弹框
    var history = $("\
      <div class='dh-modal' id='dh-lottery-history'>\
        <div class='dh-modal-background'></div>\
        <div class='dh-modal-content'>\
        </div>\
        <button class='dh-modal-close'></button>\
        <button class='dh-history-clean dh-modal-btn'>Clean all</button>\
        <div class='dh-modal-config-number' >\
        <button class='dh-number-inc dh-modal-btn'>+</button>\
        <div class='dh-number dh-modal-btn'>1</div>\
        <button class='dh-number-dec dh-modal-btn'>-</button>\
        </div>\
      </div>\
    ");
    lotteryBoxEl.append(svgIcons);
    lotteryBoxEl.append(selectorbox);
    lotteryBoxEl.append(container);
    lotteryBoxEl.append(history);
    if(settings.showbtn) lotteryBoxEl.append(btn);
    dom.append(lotteryBoxEl);
    dom.append(modal);

    //注册dom事件
    $('#dh-lottery-go').click(function() {
      if (lotteryInterval) {
        return stopLottery();
      } else {
        return startLottery();
      }
    });
    $('#dh-lottery-winner .dh-modal-close').click(function() {
      return $('#dh-lottery-winner').removeClass('is-active');
    });
    $('#dh-lottery-history .dh-modal-close').click(function() {
      return $('#dh-lottery-history').removeClass('is-active');
    });
    $('#dh-lottery-history .dh-history-clean').click(function() {
      cleanHistory();
    });

    $('#dh-lottery-history .dh-number-inc').click(function () {
      if (settings.number < 10) {
        settings.number += 1;
        localStorage.setItem('lotteryConfigNumber', settings.number);
        $('#dh-lottery-history .dh-number').text(settings.number);
      }
    });
    $('#dh-lottery-history .dh-number').click(function () {
      settings.number = 1;
      localStorage.setItem('lotteryConfigNumber', settings.number);
      $('#dh-lottery-history .dh-number').text(settings.number);
    })
    $('#dh-lottery-history .dh-number-dec').click(function () {
      if (settings.number > 1) {
        settings.number -= 1;
        localStorage.setItem('lotteryConfigNumber', settings.number);
        $('#dh-lottery-history .dh-number').text(settings.number);
      }
    });

    $('#dh-history-show').click(function() {
      showHistory();
      $('#dh-lottery-history .dh-number').text(settings.number);
    });
    document.body.onkeydown = function(e) {
      if (e.keyCode == 27) {
        return $('.dh-modal-close').click();
      }
      if (e.keyCode == 32) {
        if ($('#dh-lottery-winner').hasClass('is-active')) return;
        return $('#dh-lottery-go').click();
      }
      if (e.keyCode == 70) {
        function launchFullscreen(element) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
          }
        }

        launchFullscreen(document.documentElement);
      }
    };
  }

  var initSelector = function() {
    var el = "";
    for (var i = 0; i < settings.number; i++){
      var selector = "\
        <span class='image' id='selector_"+i+"'>\
          <div class='selector-border'></div>\
        </span>\
      ";
      el = el + selector;
    }
    $("#dh-lottery-selector").html(el);
    setTimeout(function() {
      positionList = getAllPosition();
      $('#dh-lottery-selector .image').show()
      for (var i = 0; i < settings.number; i++) moveToTarget(i,0);
    }, 1000);
  }

  var appendNewUserToList = function(item){
    var html = `
      <div class="column">
        <div class="profile" data-profile="${encodeURIComponent(JSON.stringify(item))}">
          <div class="profile__parent">
              <div class="profile__wrapper">
                <div class="profile__content">` + (function(){
                  if (item.avatar) {
                    return `<div class="avatar"><span class="image avatar-image is-128x128"><img src="${item.avatar}" alt="avatar" /></span></div`
                  } else {
                    return `<div class="avatar"><span class="image dh-name-avatar avatar-image is-128x128">${item.data[settings.title] || item.name}</span></div>`
                  }
                })()
                + `</div>
              </div>
          </div>
        </div>
      </div>
    `;
    return $(".userlist").append(html);
  }

  var loadApi = function(){
    $.ajax({
      type: "GET",
      url: settings.api,
      dataType: 'json',
      success: function(data){
        settings.data = data;
        console.log("Lottery: API data loaded");
        readyLottery();
      },
      error: function(xhr, type){
        alert('Lottery: Load player list error!\n'+type+'\n'+type);
      }
    })
  }

  //一些微小的准备工作
  var readyLottery = function(){
    settings.$el = $(settings.el);
    if(localStorage.getItem('lotteryHistory')) settings.winnerHistory = JSON.parse(localStorage.getItem('lotteryHistory'));
    initDom(settings.$el);
    $.each(settings.data, function(index,item){
      item['id'] = index;
      appendNewUserToList(item);
    })
    new MaterialAvatar(document.getElementsByClassName('dh-name-avatar'), avatarOptions);
    console.log('Lottery: ' + settings.data.length + ' player');
    if(settings.confetti) window.readyConfetti();
  }

  //设置元素大小
  var setItemSize = function(itemSideSize){
    $(".dh-lottery .avatar .image").css('height',itemSideSize+'px');
    $(".dh-lottery .avatar .image").css('width',itemSideSize+'px');
    $("#dh-lottery-selector .image").css('height',itemSideSize+'px');
    $("#dh-lottery-selector .image").css('width',itemSideSize+'px');
  }

  var positionList = [];
  var currentTarget = [];
  var winnerProfile = [];
  var lotteryInterval = null;
  var lotteryTimeout = null;

  //缩放窗口时重新计算头像位置
  $(window).resize(function() {
    positionList = getAllPosition();
    for(var i in currentTarget) moveToTarget(i,currentTarget[i]);
  });

  var getAllPosition = function() {
    return $.map($('.profile'), function(el, index) {
      profileEls[index] = el
      return $(el).find('.avatar-image').first().position();
    });
  };

  var arrayCount = function(o){
    var n = 0;
    for(var i in o) n++;
    return n;
  }

  //新增中奖者dom
  var pushWinner = function(winnerProfile){
    var el = $(`
      <div class='profile-item'>
        <div class='avatar-image'>
          <h1>${crownIconHtml}</h1>
          <div class='avatar'><span class='image avatar-image'><img src='' alt='avatar' /></span></div>
        </div>
        <h2 class='profile-name'></h2>
        <h3 class='profile-subtitle'></h3>
        <h4 class='profile-desc'></h4>
      </div>
    `)
    var cardSubTitle, cardTitle, cardDesc;
    if (winnerProfile) {

      if (winnerProfile['data'] && Object.keys(winnerProfile['data']).length > 0) {
        cardTitle = winnerProfile['data'][settings.title];
        cardSubTitle = winnerProfile['data'][settings.subtitle];
        cardDesc = winnerProfile['data'][settings.desc];
      }

      var profileName = cardTitle || winnerProfile['name']
      var profileSubtitle = cardSubTitle || winnerProfile['company']
      var profileDesc = cardDesc || ""

      if (winnerProfile['avatar']) {
        el.find('.avatar-image img').attr('src', winnerProfile['avatar']);
      } else {
        el.find('.avatar-image img').remove();
        el.find('.avatar-image').addClass('dh-name-avatar').text(profileName)
      }

      el.find('.profile-name').text(profileName);
      el.find('.profile-subtitle').text(profileSubtitle);
      el.find('.profile-desc').text(profileDesc);
    }
    $("#dh-lottery-winner .dh-modal-content").append(el);
    new MaterialAvatar(document.getElementsByClassName('dh-name-avatar'), avatarOptions);
  }

  var moveToTarget = function(i,target) {
    $(profileEls[target]).addClass('current');
    if (!positionList[target]) return;
    move('#dh-lottery-selector #selector_'+i).x(positionList[target].left - 4).y(positionList[target].top - 4).ease('in-out').duration(200).end();
    return currentTarget;
  };

  //使用选定的抽奖器抽取一个中奖用户
  var lotteryOnce = function(selector = 0){
    if (positionList <=0 ) return;
    var targetIndex = Math.floor(Math.random() * positionList.length);
    //Math.random()>0.8? targetIndex =Math.floor(Math.random() * positionList.length): targetIndex =2;
    //去重，所有轮中无重复且当前轮无重复

    if( (settings.once && settings.winnerList[targetIndex]) || $.inArray(targetIndex,currentTarget)>=0){
      console.log("Lottery: dup, next.");
      lotteryOnce(selector);
      return false;
    }
    moveToTarget(selector,targetIndex);
    currentTarget.push(targetIndex);
  }

  var stopLottery = function(){
    settings.$el.removeClass('running-lottery')
    console.log('Lottery: stoping...');
    clearTimeout(lotteryTimeout);
    // 清空中奖dom和本轮获奖者名单
    $("#dh-lottery-winner .dh-modal-content").html("");
    settings.winners = [];
    // 更新本轮中奖者信息
    for (var i = 0; i < currentTarget.length; i++) {
      var winnerProfile = JSON.parse(decodeURIComponent($($('.profile')[currentTarget[i]]).data('profile')));
      var userId = winnerProfile['id'];
      settings.winners[userId] = winnerProfile;
      settings.winnerList[userId] = winnerProfile;//储存本轮中奖者到历史中奖者名单，以筛除重复中奖
      pushWinner(winnerProfile);
    }
    // 根据中奖者人数调整双栏布局和文字大小
    $("#dh-lottery-winner .dh-modal-content").removeClass('dh-morewinner').removeClass('dh-solowinner');

    $(".dh-modal-content .profile-item").css('font-size','50px');
    if(currentTarget.length > 3) $("#dh-lottery-winner .dh-modal-content").addClass('dh-morewinner');
    if(currentTarget.length < 4) $(".dh-modal-content .profile-item").css('font-size','70px');
    if (currentTarget.length < 2) {
      $(".dh-modal-content .profile-item").css('font-size', '90px');
      $("#dh-lottery-winner .dh-modal-content").addClass('dh-solowinner');
    }
    clearInterval(lotteryInterval);
    console.log("Lottery: Ignore user #",settings.winnerList);
    if(settings.confetti){
      window.startConfetti();
      setTimeout(function() {
        return window.stopConfetti();
      }, 1500);
    }
    setTimeout(function() {
      return $('#dh-lottery-winner').addClass('is-active');
    }, 700);
    lotteryInterval = null;
    $('#dh-lottery-go').removeClass('success').addClass('primary').html(diceIconHtml);
    // 保存中奖信息到中奖纪录
    var history = {};
    history.time = (new Date()).toLocaleString();
    // 把获奖名单的数组转对象
    history.winner = {};
    for (var w in settings.winners) history.winner[w] = settings.winners[w];
    settings.winnerHistory.push(history);
    localStorage.setItem('lotteryHistory',JSON.stringify(settings.winnerHistory));
    return winnerProfile;
  }

  var startLottery = function () {
    initSelector()
    //检查当每用户只能获奖一次时，是否有足够剩余用户参加抽奖
    if (settings.once && settings.data.length - arrayCount(settings.winnerList) < settings.number) {
      alert('No user left to participate in lottery.');
      return false;
    }
    console.log('Lottery: started');
    settings.$el.addClass('running-lottery')
    $('#dh-lottery-winner').removeClass('is-active');
    $('#dh-lottery-selector').show();
    console.log("$('#dh-lottery-selector').show();")
    var runLottery = function () {
      currentTarget = [];
      $(".dh-lottery .profile.current").removeClass('current');
      for (var i = 0; i < settings.number; i++)  lotteryOnce(i);
      console.log('Lottery: moveToTarget #', currentTarget);
    }
    runLottery()
    lotteryInterval = setInterval(runLottery, settings.speed);
    if (settings.timeout) lotteryTimeout = setTimeout(stopLottery, settings.timeout * 1000);
    $('#dh-lottery-go').removeClass('primary').addClass('success').html(okayIconHtml);
    return true;
  }

  var cleanHistory = function(){
    if (confirm('Delete Lottery History. Sure?')==true){
      localStorage.setItem('lotteryHistory','');
      settings.winnerHistory = [];
      $("#dh-lottery-history .dh-modal-content").html('');
      return true;
    }else{
      return false;
    }
  }

  var showHistory = function(){
    var tplItem = function(data) { return `
      <div class='dh-history-item'>
        <div class='dh-history-info'>
          <h1>${data.i}</h1>
          <p>${data.time}</p>
        </div>
        <div class='dh-history-user'>
        </div>
      </div>
    `};
    var tplUser = function (data) { return `
      <div>
        ` + (function () {
          if (data.avatar) {
            return `<div class="avatar"><span class="image avatar-image is-128x128"><img src="${data.avatar}" alt="avatar" /></span></div`
          } else {
            return `<div class="avatar"><span class="image dh-name-avatar avatar-image is-128x128">${data.data[settings.title] || data.name}</span></div>`
          }
        })() + `
        <h3 class='name'>${data.data[settings.title] || data.name}</h3>
      </div>
    `};
    var box = $("#dh-lottery-history .dh-modal-content");
    box.html("");
    var history = settings.winnerHistory.reverse();
    //输出中奖纪录dom
    for(var item in history){
      var _this = history[item]
      _this.number = arrayCount(_this.winner);
      _this.i = Number(item) + 1;
      var lottery_item = $(tplItem(_this));
      //输出中奖用户dom
      for(var user in _this.winner){
        var _this = history[item]['winner'][user];
        var lottery_user = $(tplUser(_this));
        lottery_item.find(".dh-history-user").append(lottery_user);
      }
      box.append(lottery_item);
    }
    $("#dh-lottery-history").addClass("is-active");
    new MaterialAvatar(document.getElementsByClassName('dh-name-avatar'), avatarOptions);
    return settings.winnerHistory;
  }

  //Controller
  var controller = {
    // 加载
    init : function (options) {
      settings = $.extend({},defaultOptions, options);
      settings.api != null ? loadApi(settings.api) : readyLottery();//如果api存在则读取api，否则使用data中数据
      // 若不指定抽奖人数，则尝试从 localStorage 中获取
      if (!options.number && localStorage.lotteryConfigNumber) {
        settings.number = parseInt(localStorage.lotteryConfigNumber) || 1
      }
    },
    // 抽奖
    start : function (){
      return startLottery();
    },
    // 停，返回中奖用户
    stop : function (){
      return stopLottery();
    },
    // 获取用户列表
    getUsers : function(){
      return settings.data;
    },
    winners : function(action){
      switch (action) {
        case 'get':
          return settings.winners;
          break;

        case 'clean':
          settings.winnerList = [];
          return true;
          break;

        default:
          console.error( 'Action ' +  action + ' does not exist.' );
          break;
      }
    },

    // 显示历史中奖记录
    history : function(action){
      switch (action) {
        case 'show':
          return showHistory();
          break;

        case 'get':
          return settings.winnerHistory;
          break;

        case 'clean':
          return cleanHistory();

        default:
          console.error( 'Action ' +  action + ' does not exist.' );
          break;
      }
    },
  };

  $.lottery = function( method ) {
    if ( controller[method] ) {
      return controller[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return controller.init.apply( this, arguments );
    } else {
      console.error( 'Method ' +  method + ' does not exist.' );
    }
  };

})();
