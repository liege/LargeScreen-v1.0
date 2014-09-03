//@popover
//target 模块内容div节点，tmpl模板，包含html内容与属性变量
//wrap 模块容器li节点，存储data-from
//data 缓存于li=》data-from属性，内容模板、编辑框模板皆以data为渲染数据对象
var popover = {
	layoutWrap:document.getElementById("popover"),
	posTop:0,
	target:null,
	wrap:null,
	moduleId:null,
	data:null
};
//隐藏编辑框
popover.hide = function(){
	this.layoutWrap.style.display = "none";
};
//定位
popover.pos = function(){	
	// this.layoutWrap.style.top = this.posTop + "px";
	$(this.layoutWrap).animate({top:this.posTop + "px"},300) ;
	return this;
};
//载入内容
popover.loadContent = function(){
	var _this = this;
	_this.moduleId = $(_this.target).parent("li")[0].dataset.identity;
	var tmpl = $("#popoverContent").find("."+_this.moduleId);
	$.template("controlTmpl",tmpl);
	$(".popover-inner").html($.tmpl("controlTmpl",_this.data));	
};
//载入内容
popover.loadContentRep = function(){
	var _this = this;
	_this.target = $(_this.wrap).find(".module")[0];
	_this.moduleId = $(_this.wrap)[0].dataset.identity;
	var tmpl = $("#popoverContent").find("."+_this.moduleId);
	$.template("controlTmpl",tmpl);
	$(".popover-inner").html($.tmpl("controlTmpl",_this.data));	
};
//载入btn
popover.loadBtn = function(){
	if(!$(".popover-inner div").hasClass("add_field")){
		var btn = $(".add_field").clone(true);
		$(".popover-inner").html(btn);
	}
};
//富文本编辑器
popover.fullText = function(){
	//编辑器
	var _this = this;
	var K=window.KindEditor;
	var data = _this.getDataForm();
	window.editor = K.create('textarea', {
		allowFileManager : true,
		dialogAlignType:"",
		langType : 'zh-CN',
		width : '100%',
		autoHeightMode : true,
		items:['source','preview','undo','redo','plainpaste','justifyleft','justifycenter',
		'justifyright','justifyfull','insertorderedlist','insertunorderedlist','indent',
		'outdent','subscript','superscript','formatblock','fontname','fontsize',
		'forecolor','hilitecolor','bold','italic','underline','strikethrough',
		'removeformat','hr','link','unlink','fullscreen','lineheight','clearhtml'],
		//初始化回调
		afterCreate:function(){
			this.html(data.content);
			_this.str1 = _this.target.dataset.identity;
		},
		//编辑器发生改变后执行
		afterChange:function(){
			var thisEditor = this;
			// @editor.text() 文本内容
			// @setTimeout 初始化编辑器时会先触发此回调，导致内容清空
			_this.tiemr = setTimeout(function(){
				_this.str2 = _this.target.dataset.identity;
				console.log(_this.str1==_this.str2);
				clearTimeout(_this.tiemr);
				//判断被编辑模块 target 是否发生改变
				if(_this.str1==_this.str2){
					data.content = thisEditor.html();
					_this.setDataForm(data);
				}
			},100);
		}
	});
	// editor.sync(".txt");
	// K.sync("title")	
	return true;	
};
//图片上传
popover.img = function(){	
	var _this = this;
	
	//图片上传插件
	var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : 'pickfiles', // you can pass in id...
		container: document.getElementById('container'), // ... or DOM Element itself
		url : 'upload.php',
		flash_swf_url : '../js/Moxie.swf',
		silverlight_xap_url : '../js/Moxie.xap',
		
		filters : {
			max_file_size : '10mb',
			mime_types: [
				{title : "Image files", extensions : "jpg,gif,png"},
				{title : "Zip files", extensions : "zip"}
			]
		},
	
		init: {
			PostInit: function() {
				document.getElementById('filelist').innerHTML = '';
	
				$(document).on("click","#uploadfiles",function() {
					uploader.start();
					return false;
				});
			},
	
			FilesAdded: function(up, files) {
				plupload.each(files, function(file) {
					document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
				});
			},
	
			UploadProgress: function(up, file) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			},
	
			Error: function(up, err) {
				document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
			}
		}
	});
	uploader.init();
	//初始化编辑框
	// if(_this.imgstate){return;}
	var data = _this.data;
	var $target = $(_this.target);
	//标题
	if(data.config.title){
		$(".popover-inner input[name='title']").attr("checked","checked");
	}else{
		$(".popover-inner input[name='title']").attr("checked",false);
	}
	//购物车
	if(data.config.cart){
		$(".popover-inner input[name='cart']").attr("checked",true);
	}else{
		$(".popover-inner input[name='cart']").attr("checked",false);
	}
	//价格
	if(data.config.price){
		$(".popover-inner input[name='price']").attr("checked",true);
	}else{
		$(".popover-inner input[name='price']").attr("checked",false);
	}
	//大小
	$(".popover-inner input[name='size']").eq(data.config.size).attr("checked","checked").trigger("change");
	//编辑模块
	//切换大小图
	$(".popover-inner").on("change","input[name='size']",function(e){
		data.config.size = e.currentTarget.value;
		_this.setDataForm(data);
	});
	//切换标题
	$(".popover-inner").on("change","input[name='title']",function(e){
		data.config.title = $(this).attr("checked")?"showtitle":"";
		_this.setDataForm(data);
	});			
	//切换价格
	$(".popover-inner").on("change","input[name='price']",function(e){
		data.config.price = $(this).attr("checked")?"showprice":"";
		_this.setDataForm(data);
	});			
	//切换购物车
	$(".popover-inner").on("change","input[name='cart']",function(e){
		data.config.cart = $(this).attr("checked")?"showcart":"";
		_this.setDataForm(data);
	});	
	_this.imgstate = true;		
};
//辅助空白
popover.blankSpace = function(){
	var _this = this;
	//if(_this.blankSpacestate){return;}
	//插件代码开始
	var defaults = {
		speed: 400,
		lowerBound: 1,
		upperBound: 10
	};
	var options = $.extend(defaults, options);
	
	$(".slideControl").each(function() {
		
		// set vars
		var o = options;
		var controller = false;
		var position = 0;
		var obj = this;
		$(this).addClass('slideControlInput');
		var parent = $(this).parent();
		var label = $(parent).find('label');
		parent.html("<label>" + $(label).html() + "</label><span class=\"slideControlContainer\"><span class=\"slideControlFill\" style=\"width:" + $(obj).val()*10 + "%\"><span class=\"slideControlHandle\"></span></span></span>" + $(obj).wrap("<span></span>").parent().html());
		var container = parent.find('.slideControlContainer');
		var fill = container.find('.slideControlFill');
		var handle = fill.find('.slideControlHandle');
		var input = parent.find('input');
		var containerWidth = container.outerWidth() + 1;
		var handleWidth = $(handle).outerWidth();
		var offset = $(container).offset();
		var animate = function(value){$(fill).animate({ width: value + "%"}, o.speed);};
		
		$(window).resize(function() {
			offset = $(container).offset();
		});

		
		// when user clicks anywhere on the slider
		$(container).click(function(e) {		
			e.preventDefault();
			position = checkBoundaries(Math.round(((e.pageX - offset.left + handleWidth/2)/containerWidth)*100));
			
			animate(position);
			$(input).val(position/10);
		});
		
		// when user clicks handle
		$(handle).mousedown(function(e) {
			e.preventDefault();
			controller = true;
			$(document).mousemove(function(e) {
				e.preventDefault();
				position = checkBoundaries(Math.round(((e.pageX - offset.left + handleWidth/2)/containerWidth)*100));
				if (controller) {	
					$(fill).width(position + "%");
					$(input).val(position/10);
				}
			});
			$(document).mouseup(function() {
				e.preventDefault();
				controller = false;
			});
		});
		
		// when user changes value in input
		$(input).change(function() {
			var value = checkBoundaries($(this).val()*10);
			if ($(this).val() > o.upperBound)
				$(input).val(o.upperBound);
			else if ($(this).val() < o.lowerBound)
				$(input).val(o.lowerBound);
			animate(value);
		});
		
	});
	
	// checks if value is within boundaries
	function checkBoundaries(value) {
		if (value < options.lowerBound*10)
			return options.lowerBound*10;
		else if (value > options.upperBound*10)
			return options.upperBound*10;
		else
			return value;
	}
	
	//插件代码结束
	var data = _this.data;
	//获取初始化高度
	var height = data.height;
	_this.target.style.height = height;
	var value = parseFloat(height);
	$(".slideControlInput").val(value/10);
	$(".slideControlFill").animate({ width: value + "%"}, 400);
	$("#popover").on("mousemove mousedown mouseout",$('.slideControlContainer').parent(),function(){
		data.height = $('.slideControlInput').val()*10 + "px";
		_this.setDataForm(data);
	});
	_this.blankSpacestate = true;
};
popover.title = function(){
	var _this = this;
	//if(_this.titlestate){return;}
	//初始化编辑框内容
	$("input[name=maxTitle]").val( _this.data.maxTitle);
	$("input[name=minTitle]").val( _this.data.minTitle);
	//编辑模块
	$("#popover").on("input propertychange","input",function(){
		//修改data
		 _this.data.maxTitle = $("input[name=maxTitle]").val();
		 _this.data.minTitle = $("input[name=minTitle]").val();
		//将新的data同步到data-form
		_this.setDataForm( _this.data);
	});
	_this.titlestate = true;
};
popover.setDataForm = function(data){
	var wrap = this.wrap;
	wrap.dataset.form = JSON.stringify(data);
	//通过新dataform重新渲染HTML
	refreshComponent($(wrap),data);
};
popover.getDataForm = function(){
	//返回由data-form值转换的对象
	return JSON.parse($(this.target).parent("li")[0].dataset.form);
};
//切换验证框皮肤
popover.msgVerify = function(){
	var _this = this;
	if(_this.msgVerifytate){return;}
	var data = _this.data;	
	//初始化编辑框
	_this.target.dataset.skin = data.skin;
	//编辑
	$(".popover-inner").on("click","input[name='skin']",setSkin);
	function setSkin(){
		_this.target.dataset.skin=data.skin = $(this).val();
		_this.setDataForm(data);
	}	
	_this.msgVerifytate = true;
};
//文字导航
popover.textNav = function(){
	var _this = this;
	if(_this.textNavtate){return;}
	var data = _this.data;
	
	//渲染编辑框
	_this.loadContent();
	//编辑模块
	$("#popover").on("input propertychange","input[name=textNav]",function(){
		//@index-1 第一个选中元素为添加控件，索引-1
		console.log(1);
		var index = $(this).parents(".options").index();
		//修改data
		data.list[index].content = $(this).val();
		//将新的data同步到data-form
		_this.setDataForm(data);
	});
	_this.textNavtate = true;
};
//列表链接
popover.listLink = function(){
	var _this = this;
	if(_this.lkstate){return;}
	var defaultContent = default_config[_this.data.id].list[0];
	//添加模块成员	
	$("#popover").on("click",".add_listLink",function(){
		console.log(default_config[9]);
		console.log(defaultContent);
		_this.data.list.push(defaultContent);
		//将新的data同步到data-form
		_this.setDataForm(_this.data);
		//渲染编辑框
		//重新渲染后this.target=》div会被替换，用$(_this.wrap).find(".module")代替
		popover.loadContentRep();
		$(_this.target).trigger("click");
	});	
	//编辑模块
	$("#popover").on("input propertychange","input[name=listLink]",function(e){
		//@index-1 第一个选中元素为添加控件，索引-1
		var index = $(this).parents(".options").index()-1;
		// console.log("index:"+index);
		//修改data
		popover.data.list[index].content = $(this).val();
		//将新的data同步到data-form
		_this.setDataForm(_this.data);		
	});
	//删除模块成员	
	$("#popover").on("click",".delListLink",function(e){
		//@index-1 第一个选中元素为添加控件，索引-1
		var $this = $(this).parents(".options");
		var index = $this.index()-1;
		console.log(index);
		if(_this.data.list.length<=2){
			$(".actions .delete").hide();
		}
		//修改data
		_this.data.list.splice(index,1);
		//将新的data同步到data-form
		_this.setDataForm(_this.data);
		//删除此条编辑
		$this.remove();	
	});		
	_this.lkstate = true;
};
popover.imgNav = function(){
	var _this = this;
	if(_this.imgNavstate){return;}
	//渲染编辑框
	_this.loadContent();
	//编辑模块
	$("#popover").on("input propertychange","input[name=imgNav]",function(){
		var index = $(this).parents(".options").index();
		//修改data
		_this.data.list[index].text = $(this).val();
		//将新的data同步到data-form
		_this.setDataForm(_this.data);
	});	
    //替换图片
    $(document).on("click",".piclist>li",function(e){
    	$(this).addClass("current").siblings().removeClass("current");
    	currentSrc = $(this).find("img").attr("src");
    	//修改data
    	//添加一个元素
    	console.log(_this.d.index);
    	if(!_this.d.target.parent().hasClass("replace")){
    	_this.data.list.push(default_config[_this.data.id].list[0]);
    	//改变图片src
    	_this.data.list[_this.data.list.length-1].src = currentSrc;		
    	}else{
    		_this.data.list[_this.d.index].src = currentSrc;
    	}	
    	//重新渲染
		_this.setDataForm(_this.data);
		$(_this.wrap).find(".module").trigger("click");
		//return false; //设置确定后是否关闭
		popover.d.close().remove();    	
    });	
	_this.imgNavstate =  true;
};
popover.imgAd = function(){
	var _this = this;
	if(_this.imgAdstate){return;}
	var currentSrc = "";
	var d=null;

	//编辑模块
	$("#popover").on("input propertychange","input[name=imgAd]",function(){
		//@index-1 第一个选中元素为添加控件，索引-1
		var index = $(this).parents(".options").index();
		// console.log("index:"+index);
		//修改data
		_this.data.list[index].text = $(this).val();
		//将新的data同步到data-form
		_this.setDataForm(_this.data);		
	}); 
	//删除模块成员	
	$("#popover").on("click",".delImgAd",function(){
		//@index-1 第一个选中元素为添加控件，索引-1
		var $this = $(this).parents(".options");
		var index = $this.index();
		console.log(_this.data.list.length);
		if(_this.data.list.length<=2){
			$(".delImgAd").remove();
		}

		
		//修改data
		console.log("index==>"+index);
		_this.data.list.splice(index,1);
		//将新的data同步到data-form
		_this.setDataForm(_this.data);
		//删除此条编辑
		$this.remove();	
	});		   
    //新模块选择图片
    $(document).on("click",".piclist>li",function(e){
    	$(this).addClass("current").siblings().removeClass("current");
    	currentSrc = $(this).find("img").attr("src");
    	//修改data
    	//添加一个元素
    	// console.log(_this.d.target.parent().attr("class")+"----index:"+_this.d.index)
    	if(!_this.d.target.parent().hasClass("replace")){
    	_this.data.list.push(default_config[_this.data.id].list[0]);
    	//改变图片src
    	_this.data.list[_this.data.list.length-1].src = currentSrc;		
    	}else{
    		_this.data.list[_this.d.index].src = currentSrc;
    	}		
		_this.setDataForm(_this.data);
		$(_this.wrap).find(".module").trigger("click");
		//return false; //设置确定后是否关闭
		_this.d.close().remove();    	
    });
    _this.imgAdstate = true;
};
popover.showcase = function(){
	var _this = this;
	if(_this.showcasestate){return;}
	//编辑模块
	$("#popover").on("input propertychange","input",function(){
		//修改data
		 _this.data.showcaseTitle = $("input[name=showcaseTitle]").val();
		 _this.data.contentTitle = $("input[name=contentTitle]").val();
		//将新的data同步到data-form
		_this.setDataForm( _this.data);
	});	
    //替换图片
    $(document).on("click",".piclist>li",function(e){
    	$(this).addClass("current").siblings().removeClass("current");
    	currentSrc = $(this).find("img").attr("src");
    	//修改data
    	//添加一个元素
    	console.log(_this.d.index);
    	if(!_this.d.target.parent().hasClass("replace")){
    	_this.data.list.push(default_config[_this.data.id].list[0]);
    	//改变图片src
    	_this.data.list[_this.data.list.length-1].src = currentSrc;		
    	}else{
    		_this.data.list[_this.d.index].src = currentSrc;
    	}	
    	//重新渲染
		_this.setDataForm(_this.data);
		$(_this.wrap).find(".module").trigger("click");
		//return false; //设置确定后是否关闭
		popover.d.close().remove();    	
    });
    _this.showcasestate = true;
};
popover.storefront = function(){
	var _this = this;
	if(_this.storefrontstate){return;}	
    //替换图片
    $(document).on("click",".piclist>li",function(e){
    	$(this).addClass("current").siblings().removeClass("current");
    	currentSrc = $(this).find("img").attr("src");
    	//修改data
    	//添加一个元素
    	console.log(_this.d.target.attr("class"));
    	//改变图片src
		if(_this.d.target.hasClass("bg")){
    		_this.data.bg = currentSrc;		
    	}else{
    		_this.data.logo = currentSrc;	
    	}
    	//重新渲染
		_this.setDataForm(_this.data);
		$(_this.wrap).find(".module").trigger("click");
		//return false; //设置确定后是否关闭
		popover.d.close().remove();    	
    });	
	_this.storefrontstate = true;
};
//调用dialog 序列图片
$(".popover-inner").on("click",".addImg",function(e){

		popover.d = dialog({
		title: '选择图片',
		content:  $("#"+e.currentTarget.dataset.appid).html(),
		//okValue: '确 定',
		ok: function () {
			var that = this;
		},
		statusbar: '<label><input type="checkbox">不再提醒</label>',
		okDisplay: false,
		cancelDisplay: false,
		//cancelValue: '取消',
		//cancel: function () {}
	});
	popover.d.show();        
		// popover.d.size = $(this).parents(".replace").size();
		// popover.d.index = $(this).parents(".replace").index();	
		popover.d.target = $(this);
		popover.d.index = $(this).parents(".replace").index(".replace");	
	$(".ui-dialog-footer").hide();
});	
//调用dialog 单个图片
$(".popover-inner").on("click",".change",function(e){

		popover.d = dialog({
		title: '选择图片',
		content:  $("#"+e.currentTarget.dataset.appid).html(),
		//okValue: '确 定',
		ok: function () {
			var that = this;
		},
		statusbar: '<label><input type="checkbox">不再提醒</label>',
		okDisplay: false,
		cancelDisplay: false,
		//cancelValue: '取消',
		//cancel: function () {}
	});
	popover.d.show();        
		// popover.d.size = $(this).parents(".replace").size();
		// popover.d.index = $(this).parents(".replace").index();	
		popover.d.target = $(this);
		popover.d.index = $(this).parents(".replace").index(".replace");	
	$(".ui-dialog-footer").hide();
});	
//dialog
$(function() { 
    $(".popover-inner").on("click",".dialog",function(e){
    	var elem = e.currentTarget;
		var d = dialog({
			title: 'SORRY',
			content:  $("#"+elem.dataset.appid).html(),
			okValue: '确 定',
			ok: function () {
				var that = this;
				setTimeout(function () {
					that.title('提交中..');
				}, 2000);
				return false;
			},
			cancelValue: '取消',
			cancel: function () {}
		});

		d.show();        
    });
});