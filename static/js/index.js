$(document).ready(function(){
	var content = '<div id="asideSearchText" align="center""></div><div>\
	<table id="BomMotherTableSideMenu" class ="div-right">\
	<thead>\
	<tr>\
		<th>Bom编码</th><th>物料代码</th><th>物料名称</th>\
	</tr>\
	</thead>\
	<tbody>\
	</tbody>\
</table></div>'
//创建hnsideMenu
	$(".HnSideMenu").HnSideMenu({
			"title"	:	"母BOM表",
			"bartitle"	:	"=",
			"width":225,            //边框的宽度
			"Content"	: content	
			});
//hnsideMenu内创建Hnsearch
	$(".HnSideMenu").HnSearch({
		"Searchbtn":true,
		"CreateBtnId":"",
		"CreateSearchTextId":"#asideSearchText",
		"count":1,
		"width":20,
		"KeyDownAtcion":function(e,btnthis){
			//Hnsearch_KeyDown(e,btnthis);
		},
		"usetag":'div'
	});
//展现HnsideMenu 数据
	$.ajax({
		url: "BomDataSmall/",
		type: "GET",
		dataType: "json",
		success: function(result) {
			
			testdata1 = result//result就是你想要的值
			testdata1 = testdata1.replace("\\","")
			jsons = $.parseJSON(testdata1);
			jsdata = jsons;
			$('#BomMotherTableSideMenu').yhhDataTable(
			{
				'paginate':{
					'enabled':false,
					'changeDisplayLen':false,
					'type':'updown',
					'visibleGo': false,
					'displayLen':5,  /*每页显示条数*/
					'displayLenMenu':[5,10,15,50] /*改变每页显示数目时的可选值*/
				},
				'tbodyRow':{
					'zebra':true,
					'selected':true,
					'hover':true,
					'write':function(d){ /*表格生成每行数据的方法*/
							
							var r = '<tr onclick="getRowData(this)" style="cursor:pointer;">'
							$.each(d,function(i,val){
								r+='<td>'+val+'</td>';
								
							});
							r+='</tr>';
							return r;

					}
				},
				'tbodyData':{
					'enabled':true,  /*是否传入表格数据*/
					'source':jsons  /*传入的表格数据*/
				}
			});

			}
			
});
//展现一行母单详细数据
	$('#BomChildTable').yhhDataTable();
		$.ajax({
				url: "BomData/",
				type: "GET",
				dataType: "json",
				success: function(result) {
					
					testdata1 = result//result就是你想要的值
					testdata1 = testdata1.replace("\\","")
					jsons = $.parseJSON(testdata1);
					jsdata = jsons;
					$('#BomMotherTable').yhhDataTable(
					{
						'paginate':{
							'changeDisplayLen':true,
							'type':'updown',
							'visibleGo': true,
							'displayLen':1,  /*每页显示条数*/
							'displayLenMenu':[1,5,10,30] /*改变每页显示数目时的可选值*/
						},
						'tbodyRow':{
							'zebra':true,
							'selected':true,
							'hover':true,
							'write':function(d){ /*表格生成每行数据的方法*/
									
									var r = '<tr>'
									$.each(d,function(i,val){
										r+='<td>'+val+'</td>';
										
									});
									r+='</tr>';
									return r;

							}
						},
						'tbodyData':{
							'enabled':true,  /*是否传入表格数据*/
							'source':jsons  /*传入的表格数据*/
						}
					});
					$("#BomMotherTable").children("thead").append('<tr id="SearchText"></tr>')
					
					$("#BomMotherTable").HnSearch({
						"Searchbtn":true,
						"CreateBtnId":"#Searchbtn",
						"CreateSearchTextId":"#SearchText",
						"count":getJsonLength(jsons),
						"width":8,
						"KeyDownAtcion":function(e,btnthis){
							Hnsearch_KeyDown(e,btnthis);
						}
					});

					}
					
		});
			
	
/***	
	var testdata2 = [{'a':'t001','b':'t002','c':'t003','d':'t004','e':'t005'},
		{'a':'t011','b':'t012','c':'t013','d':'t014','e':'t015'},
		{'a':'t021','b':'t022','c':'t023','d':'t024','e':'t025'},
		{'a':'t031','b':'t032','c':'t033','d':'t034','e':'t035'},
		{'a':'t041','b':'t042','c':'t043','d':'t044','e':'t045'},
		{'a':'t051','b':'t052','c':'t053','d':'t054','e':'t055'},
		{'a':'t061','b':'t062','c':'t063','d':'t064','e':'t065'},
		{'a':'t071','b':'t072','c':'t073','d':'t074','e':'t075'},
		{'a':'t081','b':'t082','c':'t083','d':'t084','e':'t085'},
		{'a':'t091','b':'t092','c':'t093','d':'t094','e':'t095'},
		{'a':'t101','b':'t102','c':'t103','d':'t104','e':'t105'}];

	
	var testdata3 = {'code':'000','data':[{'a':'t001','b':'t002','c':'t003','d':'t004','e':'t005'},
		{'a':'t011','b':'t012','c':'t013','d':'t014','e':'t015'},
		{'a':'t021','b':'t022','c':'t023','d':'t024','e':'t025'},
		{'a':'t031','b':'t032','c':'t033','d':'t034','e':'t035'},
		{'a':'t041','b':'t042','c':'t043','d':'t044','e':'t045'},
		{'a':'t051','b':'t052','c':'t053','d':'t054','e':'t055'},
		{'a':'t061','b':'t062','c':'t063','d':'t064','e':'t065'},
		{'a':'t071','b':'t072','c':'t073','d':'t074','e':'t075'},
		{'a':'t081','b':'t082','c':'t083','d':'t084','e':'t085'},
		{'a':'t091','b':'t092','c':'t093','d':'t094','e':'t095'},
		{'a':'t101','b':'t102','c':'t103','d':'t104','e':'t105'},
		{'a':'t111','b':'t112','c':'t113','d':'t114','e':'t115'}]};
	$('#testtable4').yhhDataTable({
		'paginate':{
			'changeDisplayLen':true,
			'type':'updown',
			'visibleGo': true
		},
		'tbodyRow':{
			'zebra':true,
			'write':function(d){
				return '<tr><td>'+d.a+'</td><td>'+d.b+'</td><td>'+d.c+'</td><td>'+d.d+'</td><td>'+d.e+'</td></tr>';
			}
		},
		'tbodyData':{
			'enabled':true,  /*是否传入表格数据
			'source':testdata3 /*传入的表格数据
		},
		'backDataHandle':function(d){
			if (d.code == '000'){
				return d.data;
			} else {
				alert('出错信息');
				return [];
			}
		}
	});
*/	
	//$('#testtable5').yhhDataTable({
	//	'tbodyRow':{
	//		'write':function(d){ /*表格生成每行数据的方法*/
	//			return that.drawRow(d);
	//		}
	//	},
    //	'paginate':{
    //		'visibleGo': true, /*是否开启直接翻至某页功能*/
    //		'type':'full', /*默认按钮样式递增（numbers只有数字按钮，updown增加上下页按钮，full增加首尾页按钮）*/
    //		'displayLen':10,  /*每页显示条数*/
    //		'currentPage':1 /*当前页码（初始页码）*/ 
   // 	},
    //	'serverSide': true, /*是否从服务器获取数据*/  
    	/*ajax参数*/ 
    //	'ajaxParam': {
	//		'url':projectHttpAjax.baseUrl + listActionName, /*url地址*/
	//		'type':'GET', /*ajax传输方式*/
	//		'dataType':'jsonp', /*ajax传送数据格式*/
	//		'jsonp':'callback', /*dataType是jsonp的时候，传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名*/
	//		'jsonpCallback':'jsonpCallBack', /*dataType是jsonp的时候，自定义的jsonp回调函数名称*/
	//		'data':data /*传到服务器的数据*/
	//	},
	//	'sendDataHandle':function(d){
	//		d.pageNumber = d.currentPage;
	//		delete d.currentPage;
	//		d.pageCount = d.displayDataLen;
	//		delete d.displayDataLen;
	//		console.log('检索结果入参：' + JSON.stringify(d));
	//		return d;
	//	},  /*传递到服务器的数据预处理方法*/
	//	'backDataHandle':function(d){
	//		console.log('检索结果出参：' + JSON.stringify(d));
	//		var r = {'errFlag':false,'errMsg':'','dataLen':0,'data':[],'origData':null};
	//		if (d == null) {
	//			r.errFlag=true,r.errMsg=_ERR_MSG;
	//		} else if (d.flag != '0') {
	//			r.errFlag=true,r.errMsg=d.message;
	//		} else {
	//			r.errMsg=d.message,r.dataLen=d.data.totalCount,r.data=d.data.list;
	//			r.origData=d.data;
	//		}
	//		return r;
	//	},  /*预处理从服务器的接收数据或者js传入的数据*/
    //	'beforeShow':function(){loadingDialog.show();},  /*显示之前的额外处理事件*/
    //	'afterShow':function(errFlag,errMsg,dataLen,listData){
    //		loadingDialog.hide();
    //		if (errFlag) {
    //			$page.find('.recorder-counts').text(0);
    //			msgDialog.show(errMsg);
    //		} else {
    //			$page.find('.recorder-counts').text(listData.totalCount);
    //			$table.find('.operation-btn').button();
    //			$table.find('.disable-operation-btn').button().button('disable');
    //		}
    //		$table.find('.results-checkbox-all').removeClass('fa-check-square-o').addClass('fa-square-o');
    //	}  /*显示之后的额外处理事件*/
	//});*/
	
	/*更新表格*/ 
	var refreshTable = function(data,page){
			if ($.isEmptyObject(data)) data = {};
			var toData = {
				'ajaxParam':{'data':data}
			}
			if (!$.isEmptyObject(page)){
				toData.paginate = {};
				toData.paginate.currentPage = page;
			}
			var $table = $page.find('.result-list');
			$table.yhhDataTable('refresh',toData);
	
		}
	
});
//获取母单信息返回一个母单信息并且返回子类详细信息
function getRowData(data){
	//刷新id并且获取id
	$("tbody").each(function(i,val){
	var c = 0;
	$(this).children("tr").each(function(i1,val1){
		
		$(this).attr("id","row"+c);
		c = c + 1;
		var c1 = 0;
		$(this).children("td").each(function(i2,val2){
			$(this).attr("id","col"+c1);
			c1 = c1 + 1
			
		});
	});
	});	
	
	var id = data.querySelector("#col0").innerText
	postandgetOneMotherBom(id)
	postandgetChildBom(id);
	iddata = []
	console.log(id)

}
//获取子类详细信息
function postandgetChildBom(val){
	console.log("Post ChildBomPost/");
	$.ajax({
		url: "ChildBomPost/",
		type: "POST",
		dataType: "json",
		data:{"id":val},
		success: function(result) {
			//console.log("成功");
			cleanBomChildTablePage();
			testdata1 = result//result就是你想要的值
			testdata1 = testdata1.replace("\\","")
			jsons = $.parseJSON(testdata1);
			$('#BomChildTable').yhhDataTable(
			{
				'paginate':{
					'changeDisplayLen':true,
					'type':'updown',
					'visibleGo': true
				},
				'tbodyRow':{
					'zebra':true,
					'selected':true,
					'hover':true,
					'write':function(d){ /*表格生成每行数据的方法*/
							var r = '<tr ondblclick="getChildRowData(this)">'
							$.each(d,function(i,val){
								r+='<td>'+val+'</td>';
								
							});
							r+='</tr>';
							return r;

					}
				},
				'tbodyData':{
					'enabled':true,  /*是否传入表格数据*/
					'source':jsons  /*传入的表格数据*/
				}
			});
		}
			//以下修改ebod中所有tr中
	});

}
//获取单个母单数据
function postandgetOneMotherBom(val){
	
	console.log("Post postandgetOneMotherBom/");
	$.ajax({
		url: "getOneMotherBom/",
		type: "POST",
		dataType: "json",
		data:{"id":val},
		success: function(result) {
			console.log("ChildtoBomMotherData POST成功");
			cleanBomMotherTablePage();
			testdata1 = result//result就是你想要的值
			testdata1 = testdata1.replace("\\","")
			jsons = $.parseJSON(testdata1);
			$('#BomMotherTable').yhhDataTable(
			{
				'paginate':{
					'changeDisplayLen':true,
					'type':'updown',
					'visibleGo': true,
					'displayLen':1,  /*每页显示条数*/
					'displayLenMenu':[1,5,10,30] /*改变每页显示数目时的可选值*/
				},
				'tbodyRow':{
					'zebra':true,
					'selected':true,
					'hover':true,
					'write':function(d){ /*表格生成每行数据的方法*/
								
								var r = '<tr">'
								$.each(d,function(i,val){
									r+='<td>'+val+'</td>';
									
								});
								r+='</tr>';
								return r;

					}
				},
				'tbodyData':{
					'enabled':true,  /*是否传入表格数据*/
					'source':jsons  /*传入的表格数据*/
				}
			});
			createSearch();

		}
	});

}
function cleanBomChildTablePage(){

	var html ='<table id="BomChildTable">'
		html += '<thead>'
		html += $("#BomChildTable").children('thead').html()	
		html += '</thead>'
		html +='<tbody></tbody></table>'
		//console.log(html)
	$("#BomChildTable").parent('#frame_BomChildTable').remove();
	$("#BomChildTable").remove()
	$("body").children('div').append(html)

}
function cleanBomMotherTablePage(){

	var html ='<table id="BomMotherTable">'
		html += '<thead>'
		html += $("#BomMotherTable").children('thead').html()	
		html += '</thead>'
		html +='<tbody></tbody></table>'
		console.log(html)
	$("#BomMotherTable").parent('#frame_BomMotherTable').remove();
	$("#BomMotherTable").remove()
	$("body").children('div').prepend(html)

}
function cleanSearch(){
	$(SearchText).remove();
}
function getChildRowData(data){
		//刷新id并且获取id
	$("tbody").each(function(i,val){
	var c = 0;
	$(this).children("tr").each(function(i1,val1){
		
		$(this).attr("id","row"+c);
		c = c + 1;
		var c1 = 0;
		$(this).children("td").each(function(i2,val2){
			$(this).attr("id","col"+c1);
			c1 = c1 + 1
			
		});
	});
	});	
	var id = data.querySelector("#col0").innerText
	//data.attr()
	//iddata.push(id)
	console.log("ChildtoBomMotherData POST:返回母类BOM")
	console.log(id)
	$.ajax({
		url: "ChildtoBomMotherData/",
		type: "POST",
		dataType: "json",
		data:{"id":id},
		success: function(result) {
			console.log("ChildtoBomMotherData POST成功");
			cleanBomMotherTablePage();
			testdata1 = result//result就是你想要的值
			testdata1 = testdata1.replace("\\","")
			jsons = $.parseJSON(testdata1);
			$('#BomMotherTable').yhhDataTable(
			{
				'paginate':{
					'changeDisplayLen':true,
					'type':'updown',
					'visibleGo': true,
					'displayLen':1,  /*每页显示条数*/
					'displayLenMenu':[1,5,10,30] /*改变每页显示数目时的可选值*/
				},
				'tbodyRow':{
					'zebra':true,
					'selected':true,
					'hover':true,
					'write':function(d){ /*表格生成每行数据的方法*/
								
								var r = '<tr">'
								$.each(d,function(i,val){
									r+='<td>'+val+'</td>';
									
								});
								r+='</tr>';
								return r;

					}
				},
				'tbodyData':{
					'enabled':true,  /*是否传入表格数据*/
					'source':jsons  /*传入的表格数据*/
				}
			});
			createSearch();
		}
	});

}
function getJsonLength(jsonData){//获取json列数
    var jsonLength = 0;
    for(var item in jsonData[0]){
       jsonLength++;
    }
    return jsonLength;
}
//搜索键
function Hnsearch_KeyDown(e,btnthis){
	if(event.keyCode == 13){
		var _json =[]
		//这一段是 或查询，每个任何一个字段包含的都进来
		// btnthis.children("th").each(function (index,val){
		// 	if (jsdata == undefined || val == undefined){
		// 		alert("无名数据")
		// 	}else{
				
		// 		var text = $(val).children("input").val();
		// 		if (text == ""){
		// 			return true;
		// 		}
		// 		for(var i =0;i<jsdata.length ;i++){
		// 			var _i = jsdata[i][index].indexOf(text);
		// 			if( _i >= 0 && _i <= jsdata[i][index].length){//找到数据
		// 				_json.push(jsdata[i])
		// 			}
					
		// 		}

		// 	}
		// 	data = _json;


		// });
		//这一段是 且查询 任何字段包含的才进来
		if (jsdata == undefined){
			alert("无名数据")
		}else{
			for(var i =0;i<jsdata.length ;i++){
				var isallindex = true
				btnthis.children("th").each(function (index,val){
					var text = $(val).children("input").val();
					if (text == ""){
						return true;
					}
					var _i = jsdata[i][index].indexOf(text);
					if( _i < 0 || _i > jsdata[i][index].length){//找到数据
						isallindex = false
					}
				});
				if(isallindex == true){
					_json.push(jsdata[i])
				}
			}
		}
		cleanBomMotherTablePage()
		var isenable = true
		if(_json.length == 0){
			isenable =false
			_json = jsdata
		}
		$('#BomMotherTable').yhhDataTable(
			{
				'paginate':{
					'changeDisplayLen':true,
					'type':'updown',
					'visibleGo': true
				},
				'tbodyRow':{
					'zebra':true,
					'selected':true,
					'hover':true,
					'write':function(d){ /*表格生成每行数据的方法*/
						
						var r = '<tr">'
						$.each(d,function(i,val){
							r+='<td>'+val+'</td>';
							
						});
						r+='</tr>';
						return r;
					}
				},
				'tbodyData':{
					'enabled':isenable,  /*是否传入表格数据*/
					'source':_json  /*传入的表格数据*/
				}
			});
		createSearch()	
	};
}
function createSearch(){
	cleanSearch();
	$("#BomMotherTable").children("thead").append('<tr id="SearchText"></tr>');
				
	$("#BomMotherTable").HnSearch({
		"Searchbtn":true,
		"CreateBtnId":"#Searchbtn",
		"CreateSearchTextId":"#SearchText",
		"count":getJsonLength(jsons),
		"width":13,
		"KeyDownAtcion":function(e,btnthis){
			Hnsearch_KeyDown(e,btnthis);
		}
	});
}

function cleanButton(){
	val = "CLEAN"
	$.ajax({
		url: "ChildtoBomMotherData/",
		type: "POST",
		dataType: "json",
		data:{"id":val},
		success: function(result) {
			//console.log("成功");
		}
	});
}
//获取json列
function getParamValues(name, arr) {
    var ret = []
    for (var i = 0, len = arr.length; i < len; i++) {
        ret.push(arr[i][name])
    }
    return ret
}
//合并json列
function extend(des, src, override){
  if(src instanceof Array){
    for(var i = 0, len = src.length; i < len; i++)
       extend(des, src[i], override);
  }
  for( var i in src){
    if(override || !(i in des)){
      des[i] = src[i];
    }
  }
  return des;
}
var jsdata =[]	
var iddata =[]