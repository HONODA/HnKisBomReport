/*
在页面 body 中添加 此标签
<HnSideMenu class ="HnSideMenu">
</HnSideMenu>
Release By HJD HN
*/

(function ($) {	

	$.fn.HnSideMenu = function(param){
		param = Option.U(param)
		this.append('<input type="checkbox" id="hnside"/>')
		this.append('<div class="SideMenuContent"></div>')
		var sideMenuContent = this.children(".SideMenuContent")
		sideMenuContent.append('<aside> <h1>'+param.title+'</h1></aside>')
		var asides = sideMenuContent.children("aside")
		sideMenuContent.append('<label for = "hnside">'+param.bartitle+'</label>')
		if(param.Content != undefined){
			asides.append(param.Content)
		}
		asides.css("width",param.width)
		//TODO:想办法将label和aside绑定
		
		
	};
    /*插件默认参数 */
	var defaults ={
			"title"	:	"HnSideMenu",
			"bartitle"	:	"=",
			"width":"200px",            //边框的宽度
			"CreateSearchTextId":"SearchText",
			"KeyDownAtcion":function(e,btnthis){},//TODO 按键事件
			"Content"	:	'<div id="asideSearchText" align="center""></div>'
	};

	var Option ={
        'U':function(_param){
            var newparam =_param;
            for(i in defaults){
                if (_param[i] == undefined){
                    newparam[i] = defaults[i]
                }
            }

            
            return newparam;
        }
	}
	
})(jQuery);