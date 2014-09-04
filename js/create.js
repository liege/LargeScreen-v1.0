var localData = [
{name:"logo",content:{src:"images/logo.png",id:""}},
{name:"menu",content:[{text:"乳脂奶油蛋糕",href:"#",id:""},{text:"慕斯蛋糕",href:"#",id:""},{text:"巧克力蛋糕",href:"#",id:""}]},
{name:"banner",content:[{src:"images/banner1.jpg",href:"http:",id:""},{src:"images/banner2.jpg",href:"#",id:""},{src:"images/banner3.jpg",href:"#",id:""}]},
{name:"product",content:[{text:"慕斯系列",id:""},{text:"吐司系列",id:""}]}
];
var defaultData = [
{name:"logo",content:{src:"images/logo.png",id:""}},
{name:"menu",content:[{text:"乳脂奶油蛋糕",href:"#",id:""},{text:"慕斯蛋糕",href:"#",id:""},{text:"巧克力蛋糕",href:"#",id:""}]},
{name:"banner",content:[{src:"images/default_banner.gif",href:"",id:""},{src:"images/banner2.jpg",href:"#",id:""},{src:"images/banner3.jpg",href:"#",id:""}]},
];
var sortData = {content:[{text:"慕斯系列",id:""},{text:"吐司系列",id:""},{text:"哈根达斯系列",id:""},{text:"奶牛系列",id:""}]};
function bannerInit(){
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
}
//@$tmpl:script元素，包含tmpl模板
//@data:数据
//@插入到的jq对象容器
function renderView($tmpl,data,$container){
	$tmpl.tmpl(data).appendTo($container)
	.attr({"data-form":JSON.stringify(data)});
}
function refreshView($tmpl,data,$container){
	$container.find(".dataWrap").remove();
	$tmpl.tmpl(data).appendTo($container)
	.attr({"data-form":JSON.stringify(data)});	
	// $container.html($tmpl.tmpl(data).attr({"data-form":JSON.stringify(data)}));
}
var edit ={
	data:{},
	target:{},
	wrap:{},
	template:{}
};
edit.setDataForm = function(data){
	this.dataWrap.data("form",JSON.stringify(data));
	//通过新data重新渲染HTML
	// refreshComponent($(wrap),data);
	refreshView($('#'+data.name+'_tmpl'),data,$('.TY_'+data.name));
};
edit.getDataForm = function(){
	return this.dataWrap.data("form");
};
edit.logo = function(){	
	//添加图片列表到编辑框
	var list = $('#bin_logo').tmpl().appendTo(".ui-dialog-content");	
	//设置当前使用图片样式，服务器数据添加正则判断
	list.find("li").each(function(i,v){
		if($(v).find("img").attr("src")==edit.data.content.src){
			$(v).addClass("active");
			return;
		};
	});
	// if(edit.logostate){return;} || $(document).off;
	$(document).on("click",".piclist_logo>li",changeSrc);	
	function changeSrc(e){
    	$(this).addClass("current").siblings().removeClass("current");
    	currentSrc = $(this).find("img").attr("src");
    	//改变图片src
    	edit.data.content.src = currentSrc;	
    	//重新渲染
		edit.setDataForm(edit.data);
		edit.d.close();    	
		// edit.d = null;
		$(document).off("click",".piclist_logo>li",changeSrc);
    }	
    // edit.logostate = true;	
};
edit.banner = function(){
	var list = $('#bin_banner').tmpl().appendTo(".ui-dialog-content");	
	list.hide();
	edit.content.on("click",".choice_image",function(){
		console.log($(this)[0]);
		$(this).parent("li").addClass("active").siblings().removeClass("active");
		list.slideDown(200);
		edit.index = $(this).parent("li").index();
		edit.activeTarget = $(this);
	});
	//增加图片
	edit.content.find(".add").click(function(){
		edit.data.content.push(defaultData[2].content[0]);
		edit.setDataForm(edit.data);
		edit.target.find(".edit").trigger("click");
		bannerInit();
	});
	//删除图片
	edit.content.on("click",".dele",deleElem);
	function deleElem(e){
		edit.data.content.splice($(this).parents("li").index(),1);
		$(this).parents("li").remove();
		edit.setDataForm(edit.data);
		edit.target.find(".edit").trigger("click");
		bannerInit();
	}
	//编辑文字
	edit.content.on("input",".form_input",inputed);
	function inputed(){
		edit.data.content[$(this).parents("li").index()].href = $(this).val();
	}
	$(document).on("click",".piclist_banner>li",changeSrc2);	
	function changeSrc2(e){
    	$(this).addClass("current").siblings().removeClass("current");
    	currentSrc = $(this).find("img").attr("src");
    	//改变图片src
    	edit.data.content[edit.index].src = currentSrc;	
    	//重新渲染
		edit.setDataForm(edit.data);
    	edit.activeTarget.find("img").attr("src",currentSrc);
		edit.target.find(".edit").trigger("click");
		bannerInit();
		//return false; //设置确定后是否关闭
		// edit.d.close();    	
		// edit.d = null;
		$(document).off("click",".piclist_banner>li",changeSrc2);
    }	
};
edit.product = function(){
	var list = $('#bin_sort').tmpl(sortData).appendTo(".addSort");	
	if(edit.productState){return;}
	//删除分类
	$(document).on("click",".dele_tag",removeTag);
	//添加分类
	$(document).on("click",".sort_list>li",addTag);
	function removeTag(e){
		console.log($(this).parent(".link_tag"));
		edit.data.content.splice($(this).parent(".link_tag").index(),1);
		$(this).parents(".link_tag").remove();
		edit.setDataForm(edit.data);
		// edit.target.find(".edit").trigger("click");
	}
	function addTag(e){
		var txt = $(this).text();
		var str = "";
		$.each(edit.data.content,function(i,v){
			str+=v.text;
		});
		if(str.indexOf(txt)>-1){
			$(this).animate({"text-indent":"3px"},100).animate({"text-indent":"-3px"},100)
			.animate({"text-indent":"3px"},100).animate({"text-indent":"-3px"},100).animate({"text-indent":"0"},100);
			return;
		}else{
		edit.data.content.push({text:$(this).text()});
		edit.setDataForm(edit.data);
		}
		edit.target.find(".edit").trigger("click");
	}	
	edit.productState = true;
};

$(function(){
	//$.each(localData,function(i,v){}); 一次全部加载模板 "#"+v.name+"_tmpl",localData[i],".TY_"+v.name
	//初始化视图
	renderView($("#logo_tmpl"),localData[0],$(".TY_logo"));
	renderView($("#menu_tmpl"),localData[1],$(".TY_nav"));
	renderView($("#banner_tmpl"),localData[2],$(".TY_banner"));
	renderView($("#product_tmpl"),localData[3],$(".TY_product"));
	edit.d = dialog({
		title: '编辑内容',
		content:"$('#edit_'+edit.data.name).tmpl(edit.data)",
		okValue: '确 定',
		width:796,
		ok: function () {
			var that = this;
			edit.setDataForm(edit.data);
			bannerInit();			
			this.close();
			return false;
		},
		cancel:function(){
			this.close();
			return false;
		},
		//cancel:false,
		okDisplay: false,
		cancelDisplay: false,
	});	
	//调用dialog 单个图片
	$(document).on("click",".edit",function(e){
		//当前编辑模块样式设置
		$(".module").removeClass("activeModule");
		edit.target = $(this).parents(".module").addClass("activeModule");
		//data缓存元素
		edit.dataWrap = $(this).parents(".module").find(".dataWrap");
		edit.data = edit.getDataForm();
		//编辑框内容
		edit.content = $('#edit_'+edit.data.name).tmpl(edit.data);
		edit.d.content(edit.content);			
		edit.d.show(); 
		console.log(edit.data.name)    
		edit[edit.data.name]();
		//隐藏弹窗底部dom
		// $(".ui-dialog-footer").hide();
	});	
			
});
    



$(document).ready(function(){
	$('#btn-layout').click(function(){
		layout_dialog = dialog({
			title:'选择布局',
			content:$('#dialog_bd').html(),
			width: 1000,
			lock:true,
			drag:false
		});
		layout_dialog.showModal();
		$('#page_type_form')[0].reset();
	});

	//
	$(document).on('click','#page_type_form :radio',function(){
		var $this = $(this);
		var type;
		$('#layout_type').find('li.active').removeClass('active');
		if($this.is('#home_pg')){
			type = $this[0].dataset.sourcetype;
		}else if($this.is('#list_pg')){
			type = $this[0].dataset.sourcetype;
		}else if($this.is('#video_pg')){
			type = $this[0].dataset.sourcetype;
		}else if($this.is('#self_pg')){
			type = $this[0].dataset.sourcetype;
		}

		$('#layout_type li').each(function(){
			var _type =	$(this)[0].dataset.type;
			if(type.indexOf(_type) > -1){
				$(this).show();
			}else{
				$(this).hide();
			}
			});
	});

	$(document).on('click','#layout_type li',function(){
		var $this = $(this);
		var v = $('#page_type_form :radio:checked').val();
		$this.siblings().removeClass('active').end().addClass('active');
		var urls = $this[0].dataset.url.split(' ');
		$('#preview-img')[0].src=urls[v];
	});


	$(document).on('click','#type_nav',function(){
		$('.TY_Modulebox_nav .nav_list').show();
		addDialog.close();
	});

	$(document).on('click','#type_log',function(){
		$('.TY_Modulebox_logo').show();
		addDialog.close();
	});

	$(document).on('click','#start_editor',function(){
		layout_dialog.close();
		$('#screen_bd').show();
	});
});
