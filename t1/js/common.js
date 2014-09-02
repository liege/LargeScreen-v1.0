 $(function(){
 	//首页banner滚动
    if($('#TY_banner').length > 0){
     	var slide = new TouchSlider({
    	 	id:'TY_banner',
    	 	begin:1,
    	 	auto:false,
    	 	speed:300,
    	 	timeout:2000
     	});
     	var slideFlag = $('.TY_round').find('li');
     	slideFlag.eq(0).addClass("ThemeStyle");
     	var slide = new TouchSlider({id:'TY_banner',before:function(index){
     	        slideFlag.removeClass('ThemeStyle');
     	        slideFlag.eq(index).addClass('ThemeStyle');
     	}});
     }
  //首页更多
  $('#morenav_btn').on('click',function(){
      var TY_more_box_h = -$('#TY_morenav_box').height() + 1 +'px',
          TY_morenav_box = $('#TY_morenav_box');
          if(TY_morenav_box.hasClass('TY_show')){
            TY_morenav_box.css("bottom","2px").removeClass('TY_show');
            $('#morenav_btn').removeClass('TY_show');
          }else{
            TY_morenav_box.css("bottom",TY_more_box_h).addClass('TY_show');
            $('#morenav_btn').addClass('TY_show');
          }
  })
 	//首页产品滚动
     if($('#TY_cp_scroller').length > 0){
        var slide = new TouchSlider({
            id:'TY_cp_scroller',
            begin:0,
            auto:false,
            speed:300,
            timeout:2000
        });
      }
      //列表页分类滚动
      if($('#TY_nav_scroll').length){
        var nav_scroll = new iScroll('TY_nav_scroll',{onScrollStart:function(){$('#TY_nav_scroll').iScroll('refresh');}});
      }
      //列表页产品滚动
      if($('#TY_list_move').length>0){
        var slide_list = new TouchSlider({
            id:'TY_list_move',
            begin:0,
            auto:false,
            speed:300,
            timeout:2000
        });
      }
      //计算nav上二维码的高度和logo的高度 给navbottom
      // function TY_two_code(){
      //   var TY_two_height= $('#TY_two_code').height() + $('#TY_logo').height() +20;
      //   $('#TY_nav_scroll').css('bottom',TY_two_height);
      // }
      // TY_two_code();
      // $(window).on('resize',function(){//改变一次页面的宽度重新计算一次
      //   TY_two_code();
      // });
      //详情页面图片滚动
      if($('#TY_Probanner').length > 0){
        var pro_slide = new TouchSlider({
            id:'TY_Probanner',
            begin:0,
            auto:false,
            speed:300,
            timeout:2000
        });
      }
      //优惠劵滚动
      if($('#TY_pre_box').length > 0){
        var pre_slide = new TouchSlider({
            id:'TY_pre_box',
            begin:0,
            auto:false,
            speed:300,
            timeout:2000
        });
      }
      //灯箱模式滚动
      if($('#TY_dx_box').length > 0){
        var TY_dx_box_slide = new TouchSlider({
            id:'TY_dx_box',
            begin:0,
            auto:false,
            speed:300,
            timeout:2000
        });
      }
  //视频播放
  if($('#TY_video').length){
    var video = $('#TY_video').get(0),
        TY_video_btn = $('#TY_video_btn');
        TY_video_btn.on('click',function(){
          $('#TY_video_box').addClass('TY_video_show');
          video.play();
        });
        $('#TY_video_hide').on('click',function(){
          $('#TY_video_box').removeClass('TY_video_show');
          video.load();
        });
    // video.addEventListener("playing", function () {
    //   TY_video_btn.hide();
    // });
    // video.addEventListener("pause", function () {
    //   TY_video_btn.show();
    // })
  }
 })