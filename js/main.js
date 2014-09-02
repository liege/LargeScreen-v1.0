var localData = [{name:"logo",content:{src:""}}];
//模拟数据结束
//默认模块数据
var default_config = ['',
	{id:1,content:'这里添加文本'},
	{id:2,config:{size:0,title:"showtitle",price:"showprice",cart:"showcart"}},
	{id:3,skin:'default'},
	{id:4,itmes:['北京','上海','广州','天津','大连']},
	{id:5,list:[{src:'images/default1.jpg',text:'图片文字标题'}]},
	{id:6,maxTitle:"大标题",minTitle:"小标题"},
	{id:7,list:[{content:'文本导航'},{content:'文本导航'},{content:'文本导航'},{content:'文本导航'}]},
	{id:8,list:[{src:'images/default1.jpg',text:''},{src:'images/default1.jpg',text:''},{src:'images/default1.jpg',text:''},{src:'images/default1.jpg',text:''}]},
	{id:9,list:[{content:'列表链接'}]},
	{id:10},
	{id:11,list:[{src:'images/default1.jpg'},{src:'images/default1.jpg'},{src:'images/default1.jpg'}]},
	{id:12},
	{id:13,height:'30px'},
	{id:14,bg:"images/bg.jpg",logo:"images/logo.jpg"}	
	];
//组件列表
var components = ['','fullText','img','msgVerify','locationInfo','imgAd','title','textNav','imgNav','listLink','goodSearch','showcase','subline','blankSpace','storefront'];
//按钮列表
var btnText = ['','富文本','商品列表','短信验证','地址信息','图片广告','标题','文本导航','图片导航','列表链接','商品搜索','橱窗','辅助线','辅助空白','店头'];
//全部视图模块信息
function getAllData($nodelist){
	var arr = [];
	$nodelist.each(function(i,o){
		arr[i] = JSON.parse(o.dataset.form);
	});
	return arr;
};
//设置当前dom className 为current 其同级兄弟节点取消current;
function setCurrent($this){
	$this.addClass('current').parent().siblings().find(".module").removeClass('current');	
	$this.parent().addClass('current').siblings().removeClass('current');	
}
$(document).ready(function(){
	//@$('#editor_body') 内容模块容器
	var $editor = $('#editor_body'),
		page = 0;
	//设置模块容器标识
	$(".tmpl_container>div>li").addClass("moduleWrap");
	//加载组件
	loadDefaultComponent(pagelist[0].show);
	//加载按钮
	loadDefaultBtn(pagelist[0].editBtns);
	//翻页
	function pageTurns(){
		$editor.html("");
		$("#btn_container").html("");
		loadDefaultComponent(pagelist[page].show);
		loadDefaultBtn(pagelist[page].editBtns);	
		//上传数据接口
		//所有data-form值 [{},{},{}]
		var uploadModuleConfig = getAllData($("#editor_body .moduleWrap"));
		//流程标识active切换
		$(".dash_bar li:even").eq(page).addClass("active")
		.siblings().removeClass("active");
		//当有popover显示时隐藏它
		popover.hide();
	}	
	$("#prev").click(function(){
		if(page==0){
			return;
		}
		page--;
		pageTurns();	
	});
	$("#next").click(function(){
		if(page==pagelist.length-1){
			return;
		}
		page++;
		pageTurns();
	});
	//视图模块绑定事件，调用编辑框
	$editor.on('click','.module',function(e){
		var $this = $(this);
		//设置className current 
		setCurrent($this);
		//显示编辑框
		$("#popover").show();
		popover.target = $this[0];
		popover.wrap = $this.parent()[0];
		popover.posTop = $this.parent().position().top;	
		popover.data = popover.getDataForm();
		popover.pos().loadContent();	
		
		if(popover.wrap.dataset.identity in popover){
			popover[popover.wrap.dataset.identity]();
		}
		return false;		
	});
	//按钮绑定事件，添加视图模块
	$('#btn_container').on('click','li a',function(e){
		var $this = $(this);
		var relatedComponentId = $this[0].dataset.relateid;
		var com = default_config[relatedComponentId];
		addComponentToView(com);
		setCurrent($editor.find("li:last").find("div.module"));
		$editor.find(".moduleWrap:last").find(".module").trigger("click");
	});
	//模块控制按钮事件
	$editor.on('click','.del',function(e){
		var $module = $(this).parents(".moduleWrap");
		//删除当前编辑的
		if($module.hasClass("current")){
			popover.hide();
		}
		//删除最后一个
		if($editor.find(".module").size()==1){
			popover.hide();
		}
		//移除要删除的模块
		$module.remove();
		//模拟触发被删除模块的上一个模块
		// $module.prev().find(".module").trigger("click");
		$editor.find(".current").trigger("click");
		//重新定位编辑框
		popover.pos(); 
	});
	$editor.on('click','.edit',function(e){
		$(this).parent().siblings(".module").trigger("click");
	});			
	$editor.on('click','.add',function(e){
		$(this).parent().siblings(".module").trigger("click");
		popover.loadBtn();
	});			
});


