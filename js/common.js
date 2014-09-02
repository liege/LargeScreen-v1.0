//获取浏览器高度
	$(document).ready(function(){
	var h = $(window).height() - $('.fixed_content').height() - $('.header_container').height()-20;
	$('.have-tab').css('min-height',h);
	var h = $(window).height() - $('.header_container').height()-20;
	$('.no-tab').css('min-height',h);
	var h = $(window).height() - $('.fixed_content').height() - 160;
	$('.editPanelPages').css('height',h);
    var h = $(window).height() - $('.fixed_content').height() - 135;
    $('.editPanelTheme').css('height',h);
	$('#menu_wrap').on('click','li>a',function(e){
		// e.preventDefault();
		var submenu = $(this).next();
		if(submenu.length > 0){
			var dl = $('#menu_wrap dl:visible').not(submenu[0]);
			if(dl.length > 0){
				dl.slideUp('fast',function() {
					submenu.slideToggle('fast');
					$(this).prev().toggleClass('active');
				});
			}else{
				submenu.slideToggle('fast');

			}
			$(this).toggleClass('active');
		}
	});
});
//仿select选择
$(document).ready(function () {
    $(".btn-group_more_show").hide();
    $(".btn-group_more").click(function () {
        $(".btn-group_more_show").toggle(200);
        return false;
        event.preventDefault();
    });
    $("body").click(function () {
        $(".btn-group_more_show").hide(100);
    });
});

//左侧工具菜单
var menu_opr = function(){
    if ($('.menuToggle').hasClass('opened_menu')) {
    	$('.leftPanel').addClass('closed_leftPanel');
        $('.rightPanel').addClass('full_rightPanel');
        $('.only_menu').removeClass('closed_menu');
        $('.menuToggle').removeClass('opened_menu');
    } else {
        $('.leftPanel').removeClass('closed_leftPanel');
        $('.rightPanel').removeClass('full_rightPanel');
        $('.menuToggle').addClass('opened_menu');
        $('.only_menu').removeClass('opened_menu');
    }
};
$('.menuToggle').on('click', function () {
    menu_opr();
});


//编辑内容开启与关闭
// var editor_mask = function(){
    // if ($('.editor_mask').hasClass('mask_in')) {
    	// $('.editor_mask').removeClass('mask_in');
        // $('.editor_mask').addClass('mask_out');
        // $.later(function(){
            // $('.editor_mask').removeClass('mask_out');
        // },500);
    // } else {
        // $('.editor_mask').addClass('mask_in');
        // $('.editor_mask').removeClass('mask_out');
    // }
// };
// $('.previewedit').on('click', function () {
    // editor_mask();
// });
// $('.editor_mask_close').on('click', function () {
    // editor_mask();
// });
// 
// //组件打开与关闭
// var module_mask = function(){
    // if ($('.module_mask').hasClass('mask_in')) {
        // $('.module_mask').removeClass('mask_in');
        // $('.module_mask').addClass('mask_out');
        // $.later(function(){
            // $('.module_mask').removeClass('mask_out');
        // },500);
    // } else {
        // $('.module_mask').addClass('mask_in');
        // $('.module_mask').removeClass('mask_out');
    // }
// };
// $('.module_add').on('click', function () {
    // module_mask();
// });
// $('.module_mask_close').on('click', function () {
    // module_mask();
// });