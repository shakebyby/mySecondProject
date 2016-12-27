!function($){$.fn.bsSuggest=function(opts){return"string"==typeof opts&&methods[opts]?methods[opts].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof opts&&opts?void 0:methods.init.apply(this,arguments)};var methods={init:function(opts){function adjustDropMenuPos($input,$dropdownMenu,options){$dropdownMenu.is(":visible")||("left"===options.listAlign?$dropdownMenu.css({left:$input.siblings("div").width()-$input.parent().width(),right:"auto"}):"right"===options.listAlign&&$dropdownMenu.css({left:"auto",right:"0"}))}function setBackground($input,opts){var inputbg,bg,warnbg;return opts.indexId===-1&&!opts.idField||opts.multiWord?$input:(inputbg=$input.css("background-color").replace(/ /g,"").split(",",3).join(","),bg=opts.inputBgColor||"rgba(255,255,255,0.1)",warnbg=opts.inputWarnColor||"rgba(255,255,0,0.1)",!$input.val()||$input.attr("data-id")?$input.css("background",bg):(-1===warnbg.indexOf(inputbg)&&($input.trigger("onUnsetSelectValue"),$input.css("background",warnbg)),$input))}function adjustScroll($input,$dropdownMenu){var pos,maxHeight,$hover=$input.parent().find("tbody tr."+options.listHoverCSS);$hover.length>0&&(pos=($hover.index()+3)*$hover.height(),maxHeight=Number($dropdownMenu.css("max-height").replace("px","")),pos>maxHeight||$dropdownMenu.scrollTop()>maxHeight?$dropdownMenu.scrollTop(pos-maxHeight):$dropdownMenu.scrollTop(0))}function unHoverAll(ddiv,opts){ddiv=ddiv||$dropdownMenu,opts=opts||options,ddiv.find("tr."+opts.listHoverCSS).removeClass(opts.listHoverCSS)}function checkInput(target){var $input=$(target),$dropdownMenu=$input.parent(".input-group").find("ul.dropdown-menu"),data=$input.data("bsSuggest");return 0!==$dropdownMenu.length&&(!data&&($input.data("bsSuggest",{target:target,options:options}),!0))}function getData(keyword,$input,callback,opts){var data,validData,i,obj,hyphen,URL,len,filterData={value:[]};if(keyword=keyword||"",opts=opts||options,opts.url)hyphen=opts.url.indexOf("?")!==-1?"&":"?",URL=opts.jsonp?[opts.url+keyword,hyphen,opts.jsonp,"=?"].join(""):opts.url+keyword,$.ajax({type:"GET",url:URL,dataType:"json",timeout:3e3}).done(function(result){callback($input,result,opts),$input.trigger("onDataRequestSuccess",result),"firstByUrl"===options.getDataMethod&&(options.data=result,options.url=null)}).fail(handleError);else{if(data=opts.data,validData=checkData(data))if(keyword){for(len=data.value.length,i=0;i<len;i++)for(obj in data.value[i])if($.trim(data.value[i][obj])&&(inSearchFields(obj,opts)||inEffectiveFields(obj,opts))&&(data.value[i][obj].toString().indexOf(keyword)!==-1||keyword.indexOf(data.value[i][obj])!==-1)){filterData.value.push(data.value[i]);break}}else filterData=data;callback($input,filterData,opts)}}function processData(data){return validData=checkData(data)}function checkData(data){var isEmpty=!0;for(var o in data)if("value"===o){isEmpty=!1;break}return isEmpty?(handleError("返回数据格式错误!"),!1):0!==data.value.length&&data}function inEffectiveFields(filed,opts){return opts=opts||options,!($.isArray(opts.effectiveFields)&&opts.effectiveFields.length>0&&$.inArray(filed,opts.effectiveFields)===-1)}function inSearchFields(filed,opts){return $.inArray(filed,opts.searchFields)!==-1}function refreshDropMenu($input,data,opts){var len,i,j,thead,tr,idValue,keyValue,$dropdownMenu=$input.parent().find("ul.dropdown-menu"),index=0,html=['<table class="table table-condensed">'];if(opts=opts||options,data=processData(data),data===!1||0===(len=data.value.length))return $dropdownMenu.empty().hide(),$input;if(opts.showHeader){thead="<thead><tr>";for(j in data.value[0])inEffectiveFields(j)!==!1&&(thead+=0===index?"<th>"+(opts.effectiveFieldsAlias[j]||j)+"("+len+")</th>":"<th>"+(opts.effectiveFieldsAlias[j]||j)+"</th>",index++);thead+="</tr></thead>",html.push(thead)}for(html.push("<tbody>"),i=0;i<len;i++){index=0,tr="",idValue=data.value[i][opts.idField]||"",keyValue=data.value[i][opts.keyField]||"",sourValue=data.value[i];for(j in data.value[i])keyValue||opts.indexKey!==index||(keyValue=data.value[i][j]),idValue||opts.indexId!==index||(idValue=data.value[i][j]),index++,inEffectiveFields(j)!==!1&&(tr+='<td data-name="'+j+'">'+data.value[i][j]+"</td>");tr='<tr data-index="'+i+'" data-id="'+idValue+'" data-key="'+keyValue+"\" data-sour='"+JSON.stringify(sourValue)+"'>"+tr+"</tr>",html.push(tr)}return html.push("</tbody></table>"),$dropdownMenu.html(html.join("")).show(),listEventBind($input,$dropdownMenu,opts),$dropdownMenu.css("max-height")&&Number($dropdownMenu.css("max-height").replace("px",""))<Number($dropdownMenu.find("table:eq(0)").css("height").replace("px",""))&&Number($dropdownMenu.css("min-width").replace("px",""))<Number($dropdownMenu.css("width").replace("px",""))?$dropdownMenu.css("padding-right","20px").find("table:eq(0)").css("margin-bottom","20px"):$dropdownMenu.css("padding-right",0).find("table:eq(0)").css("margin-bottom",0),$input}function listEventBind($input,dropdownMenu,opts){dropdownMenu=dropdownMenu||$dropdownMenu,opts=opts||options,dropdownMenu.find("tbody tr").each(function(e){$(this).off("mouseenter").on("mouseenter",function(e){unHoverAll(dropdownMenu,opts),$(this).addClass(opts.listHoverCSS)}).off("mousedown").on("mousedown",function(e){setValue($input,getPointKeyword($(this)),opts),setBackground($input,opts)})})}function getPointKeyword(list){var data={};return data.id=list.attr("data-id"),data.key=list.attr("data-key"),data.sour=list.data("sour"),data}function setValue($input,keywords,opts){var inputValList,_keywords=keywords||{},id=_keywords.id||"",key=_keywords.key||"";opts&&opts.multiWord?(inputValList=$input.val().split(opts.separator||" "),inputValList[inputValList.length-1]=key,$input.val(inputValList.join(opts.separator||" ")).focus()):$input.attr("data-id",id).focus().val(key),$input.trigger("onSetSelectValue",_keywords)}function handleError(e1,e2){}var self=this,options=$.extend({url:null,jsonp:null,data:{},getDataMethod:"firstByUrl",indexId:0,indexKey:0,idField:"",keyField:"",effectiveFields:[],effectiveFieldsAlias:{},searchFields:[],showHeader:!1,showBtn:!0,allowNoKeyword:!0,multiWord:!1,separator:",",processData:processData,getData:getData,autoMinWidth:!1,listAlign:"left",inputBgColor:"",inputWarnColor:"rgba(255,0,0,.1)",listStyle:{"padding-top":0,"max-height":"375px","max-width":"800px",overflow:"auto",width:"auto",transition:"0.3s","-webkit-transition":"0.3s","-moz-transition":"0.3s","-o-transition":"0.3s"},listHoverStyle:"background: #07d; color:#fff",listHoverCSS:"jhover",keyLeft:37,keyUp:38,keyRight:39,keyDown:40,keyEnter:13},opts);return $.isFunction(options.processData)&&(processData=options.processData),$.isFunction(options.getData)&&(getData=options.getData),!opts.showHeader&&options.effectiveFields&&options.effectiveFields.length>1&&(options.showHeader=!0),$("head:eq(0)").append("<style>."+options.listHoverCSS+"{"+options.listHoverStyle+"}</style>"),self.each(function(){var $input=$(this),$dropdownMenu=$input.parents(".input-group:eq(0)").find("ul.dropdown-menu");checkInput(this)!==!1&&(options.showBtn||$input.css("border-radius","4px").parents(".input-group:eq(0)").css("width","100%").find(".input-group-btn>.btn").hide(),$input.removeClass("disabled").attr("disabled",!1).attr("autocomplete","off"),$dropdownMenu.css(options.listStyle),options.inputBgColor||(options.inputBgColor=$input.css("background-color")),options.autoMinWidth===!1?$dropdownMenu.css({"min-width":$input.parent().width()}):$dropdownMenu.css("width","auto"),$input.on("keydown",function(event){var currentList,tipsKeyword="";"none"!==$dropdownMenu.css("display")&&(currentList=$dropdownMenu.find("."+options.listHoverCSS),tipsKeyword="",event.keyCode===options.keyDown?(0===currentList.length?tipsKeyword=getPointKeyword($dropdownMenu.find("table tbody tr:first").mouseover()):0===currentList.next().length?(unHoverAll($dropdownMenu,options),$(this).val($(this).attr("alt")).attr("data-id","")):(unHoverAll($dropdownMenu,options),0!==currentList.next().length&&(tipsKeyword=getPointKeyword(currentList.next().mouseover()))),adjustScroll($input,$dropdownMenu)):event.keyCode===options.keyUp?(0===currentList.length?tipsKeyword=getPointKeyword($dropdownMenu.find("table tbody tr:last").mouseover()):0===currentList.prev().length?(unHoverAll($dropdownMenu,options),$(this).val($(this).attr("alt")).attr("data-id","")):(unHoverAll($dropdownMenu,options),0!==currentList.prev().length&&(tipsKeyword=getPointKeyword(currentList.prev().mouseover()))),adjustScroll($input,$dropdownMenu)):event.keyCode===options.keyEnter?$dropdownMenu.hide().empty():$(this).attr("data-id",""),tipsKeyword&&""!==tipsKeyword.key&&setValue($(this),tipsKeyword,options))}).on("keyup",function(event){var word,words;return event.keyCode===options.keyDown||event.keyCode===options.keyUp||event.keyCode===options.keyEnter?($(this).val($(this).val()),void setBackground($input,options)):($(this).attr("data-id",""),setBackground($input,options),word=$(this).val(),void(""!==$.trim(word)&&word===$(this).attr("alt")||($(this).attr("alt",$(this).val()),opts.multiWord&&(words=word.split(options.separator||" "),word=words[words.length-1]),(0!==word.length||options.allowNoKeyword)&&getData($.trim(word),$input,refreshDropMenu,options))))}).on("focus",function(){adjustDropMenuPos($input,$dropdownMenu,options)}).on("blur",function(){$dropdownMenu.css("display","")}).on("click",function(){var words,word=$(this).val();return""!==$.trim(word)&&word===$(this).attr("alt")&&$dropdownMenu.find("table tr").length?$dropdownMenu.show():void("none"===$dropdownMenu.css("display")&&(options.multiWord&&(words=word.split(options.separator||" "),word=words[words.length-1]),(0!==word.length||options.allowNoKeyword)&&getData($.trim(word),$input,refreshDropMenu,options)))}),$input.parent().find("button:eq(0)").attr("data-toggle","").on("click",function(){var display;"none"===$dropdownMenu.css("display")?(display="block",options.url?$input.click().focus():(refreshDropMenu($input,options.data,options),adjustDropMenuPos($input,$dropdownMenu,options))):display="none",$dropdownMenu.css("display",display)}),$dropdownMenu.on("mouseenter",function(){$(this).show()}).on("mouseleave",function(){$input.focus()}))})},show:function(){var data=this.data("bsSuggest");return data&&data.options&&this.parent().find("ul.dropdown-menu").show(),this},hide:function(){var data=this.data("bsSuggest");return data&&data.options&&this.parent().find("ul.dropdown-menu").css("display",""),this},disable:function(e){return!!$(this).data("bsSuggest")&&void $(this).attr("disabled",!0).parent().find(".input-group-btn>.btn").addClass("disabled")},enable:function(){return!!$(this).data("bsSuggest")&&void $(this).attr("disabled",!1).parent().find(".input-group-btn>.btn").removeClass("disabled")},destroy:function(){$(this).off().removeData("bsSuggest").parent().find(".input-group-btn>.btn").off()}}}(window.jQuery);