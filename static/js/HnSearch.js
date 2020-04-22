(function ($) {	
    $.fn.HnSearch = function(param){
        param = Option.U(param)
        var btn = $(param.CreateSearchTextId);
        btn.each(function(index,val){
            for(var i = 0; i < param.count;i++){
                btn.append('<'+param.usetag+'><input type="text" size="'+param.width+'"id=SearchCol'+i+'"></'+param.usetag+'>');
            }
        });
        btn.keyup(function (e) { 
            if (param.KeyDownAtcion == undefined){
                Atcion.KeyDownAction(e,btn)
            }else{
                param.KeyDownAtcion(e,btn)
            }
            
        })
    };

    /*插件参数 */
    var defaults ={
        "Searchbtn" : false,
        "CreateBtnId":"",    //获取需要生成的id
        "count":1,          //生成搜索框个数
        "width":8,            //输入框的宽度
        "CreateSearchTextId":"SearchText",
        "KeyDownAtcion":function(e,btnthis){},
        "usetag":'th'
    };
    var Atcion = {
        'KeyDownAction':function(e,btnthis){
            if(event.keyCode == 13){
                alert("测试成功");
            }

        }
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