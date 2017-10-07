(function () {
  
  var settings = {};
  var defaultOptions = {
    timeout: null,
    once: false,
    title: "name",
    subtitle: null,
    api: null,
    confetti: true,
    showbtn: true,
    el: "body",
    fitsize: true,

    data: {},
    winners: {},
    $el: null
  }

  //生成dom
  var initDom = function(dom){
    var box = $("\
      <div class='lottery'></div>\
    ");
    //中奖用户高亮
    var selector = $("\
      <div id='selector' style='display: none'>\
        <span class='image'>\
          <div class='selector-border'></div>\
        </span>\
      </div>\
    ");
    //用户列表容器
    var container = $("\
      <div class='main-container'>\
        <canvas id='canvas'></canvas>\
        <div class='userlist columns is-multiline is-mobile'></div>\
      </div>\
    ");
    //控制按钮
    var btn = $("\
      <div class='actions'>\
        <a class='button primary' id='go'>🎲</a>\
      </div>\
    ");
    //中奖用户展示弹框
    var modal = $("\
      <div class='modal' id='winner'>\
        <div class='modal-background'></div>\
        <div class='modal-content'>\
          <h1>👑</h1>\
          <div class='avatar-image'>\
            <img class='avatar' src='' alt='avatar' />\
          </div>\
          <h2 class='profile-name'></h2>\
          <h3 class='profile-subtitle'></h3>\
          <h4 class='profile-descZ'></h4>\
        </div>\
        <button class='modal-close'></button>\
      </div>\
    ");
    box.append(selector);
    box.append(container);
    box.append(modal);
    if(settings.showbtn) box.append(btn);
    dom.append(box);

    //注册dom事件
    $('#go').click(function() {
      if (lotteryInterval) {
        return stopLottery();
      } else {
        return startLottery();
      }
    });
    $('.modal-close').click(function() {
      return $('#winner').removeClass('is-active');
    });
    document.body.onkeydown = function(e) {
      return $('.modal-close').click();
    };
  }

  //格式化模版
  var formatTemplate = function(data, tmpl) {  
    var format = {  
        name: function(x) {  
          return x ; 
        }  
    };  
    return tmpl.replace(/{(\w+)}/g, function(m1, m2) {  
        if (!m2)  
          return "";  
        return (format && format[m2]) ? format[m2](data[m2]) : data[m2];  
    });
  }

  //新建用户dom
  var newUser = function(item){
    var template = "\
      <div class='column'>\
        <div class='profile' data-profile='{json}'>\
            <div class='profile__parent'>\
                <div class='profile__wrapper'>\
                    <div class='profile__content'>\
                        <div class='avatar'><span class='image avatar-image is-128x128'><img src='{avatar}' alt='avatar'/></span></div>\
                    </div>\
                </div>\
            </div>\
        </div>\
      </div>\
    ";
    item['json'] = encodeURIComponent(JSON.stringify(item));
    var html = formatTemplate(item,template);
    return $(".userlist").append(html);
  }

  var loadApi = function(){
    $.ajax({
      type: 'GET',
      url: settings.api,
      dataType: 'json',
      success: function(data){
        settings.data = data;
        console.log("Load API data");
        readyLottery();
      },
      error: function(xhr, type){
        alert('Load user list error!\n'+type+'\n'+type);
      }
    })
  }

  //一些微小的准备工作
  var readyLottery = function(){
    settings.$el = $(settings.el);
    initDom(settings.$el);
    $.each(settings.data, function(index,item){
      item['id'] = index;  //为每个用户添加一个唯一id
      newUser(item);
    })
    console.log('Show User: '+settings.data.length);
    setTimeout(function() {
      positionList = getAllPosition();
      return moveToTarget(0);
    }, 1000);
    if(settings.fitsize) fitsize();
    if(settings.confetti) window.readyConfetti();
  }

  var fitsize = function(){
    //通过窗口预测一个合适大小
    var win_size = $(window).height() * $(window).width();
    var number = settings.data.length;
    var item_side = Math.round(Math.sqrt(win_size/number)/1.4);
    set_itemsize(item_side);
    
    //如果溢出窗口面积则尝试减小
    while ( !($(window).height() >= $(".lottery").height()) || !($(window).width() >= $(".lottery").width()) ) {
      if(item_side<10) break;
      item_side = item_side - 2;
      set_itemsize(item_side);
    }
  }

  //设置元素大小
  var set_itemsize = function(item_side){
    $(".lottery .avatar .image").css('height',item_side+'px');
    $(".lottery .avatar .image").css('width',item_side+'px');
    $(".lottery #selector .image").css('height',item_side+'px');
    $(".lottery #selector .image").css('width',item_side+'px');
  }
  
  var positionList = [];
  var currentTarget = null;
  var winnerProfile = null;
  var lotteryInterval = null;
  var lotteryTimeout = null;

  //缩放窗口时重新计算头像位置
  $(window).resize(function() {
    positionList = getAllPosition();
    moveToTarget(currentTarget);
    if(settings.fitsize) fitsize();
  });

  getAllPosition = function() {
    return $.map($('.profile'), function(el, index) {
      return $(el).find('.avatar-image').first().offset();
    });
  };

  moveToTarget = function(target) {
    move('#selector .image').x(positionList[target].left - 4).y(positionList[target].top - 4).ease('in-out').duration(200).end();
    return currentTarget = target;
  };

  startLottery = function(){
    console.log('start Lottery...');
    $('#selector').show();
    lotteryInterval = setInterval(function() {
      return moveToTarget(Math.floor(Math.random() * positionList.length));
    }, 350);
    if(settings.timeout) lotteryTimeout = setTimeout(stopLottery, settings.timeout * 1000);
    $('#go').removeClass('primary').addClass('success').text('👌');
    return true;
  }

  stopLottery = function(){
    console.log('stoping Lottery...');
    var userId;
    clearTimeout(lotteryTimeout);
    winnerProfile = JSON.parse(decodeURIComponent($($('.profile')[currentTarget]).data('profile')));
    userId = winnerProfile['id'];
    //opps!重复中奖
    if (settings.once && settings.winners[userId]) {
      console.log('dup, next.');
      lotteryTimeout = setTimeout(stop, 1 * 1000);
      return;
    }
    clearInterval(lotteryInterval);
    settings.winners[userId] = winnerProfile;
    if(settings.confetti){
      window.startConfetti();
      setTimeout(function() {
        return window.stopConfetti();
      }, 1500);
    }
    setTimeout(function() {
      var cardSubTitle, cardTitle;
      if (winnerProfile) {
        $('#winner .avatar').attr('src', winnerProfile['avatar']);
        if (winnerProfile['data'] && Object.keys(winnerProfile['data']).length > 0) {
          cardTitle = winnerProfile['data'][settings.title];
          cardSubTitle = winnerProfile['data'][settings.subtitle];
        }
        $('#winner .profile-name').text(cardTitle || winnerProfile['name'] );
        $('#winner .profile-subtitle').text(cardSubTitle || winnerProfile['company']);
      }
      return $('#winner').addClass('is-active');
    }, 700);
    lotteryInterval = null;
    $('#go').removeClass('success').addClass('primary').text('🎲');
    return winnerProfile;
  }
  

  //Controller
  var controller = {
    //加载
    init : function (options) { 
      settings = $.extend({},defaultOptions, options);
      settings.api != null ? loadApi(settings.api) : readyLottery();//如果api存在则读取api，否则使用data中数据
    },
    //抽奖
    start : function (){
      return startLottery();
    },
    //停，返回中奖用户
    stop : function (){
      return stopLottery();
    },
    //获取用户列表
    getUsers : function(){
      return settings.data;
    },
    //获取中奖用户
    getWinners : function(){
      return settings.winners;
    }
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
