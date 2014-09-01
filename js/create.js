
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

	var addDialog;
	$(document).on('click','#add_type1',function(){
		addDialog = dialog({
			title: '添加组件',
			content:$('#type1_temple').html(),
			width:300,
			heigth:400
		});
		addDialog.showModal();
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