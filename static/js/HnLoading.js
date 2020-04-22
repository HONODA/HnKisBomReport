(function ($) {	
	
	$.fn.HnLoading = function(param){
		Option.U(param)
        this.append('<img src="'+param.imgsrc+'"/>')
        this.hide()
	};
	$.fn.HnLoading.show = function(){
        $(window).load(function(){  //load函数
            this.show();
        });
    }
	$.fn.HnLoading.hide = function(){
        $(window).load(function(){  //load函数
            this.hide();
        });
    }
	var defaults ={
		'imgsrc' : 'loading.gif'
	}
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