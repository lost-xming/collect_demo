var dxlWin = window.location;
var windowHttp = dxlWin.protocol == "https:" ? "https:" : "http:";
var dxlfiles = "";
var dxlHost = dxlWin.hostname.split(".").reverse();
var windowServer = dxlHost[0];
var s4Com = windowServer != "dev" && windowServer != "test" && windowServer != "alpha" ? "com" : windowServer;
var s4Net = windowServer == "com" || windowServer == undefined || windowServer == "" || windowServer == "cn" ? "net" : windowServer;
var dxlHttp = {
	v:"201605051405",
	ie:$.browser != undefined && $.browser.msie && $.browser.version==6.0 ? true : false,
	com:"https://jsonp.daoxila." + s4Com + "/",
	www:windowHttp + "//www.daoxila." + s4Com + "/",
	cityCom:windowHttp + "//" + dxlHost[2] + ".daoxila." + s4Com + "/",
	b:windowHttp + "//b.daoxila." + s4Com + "/",
	my:windowHttp + "//my.daoxila." + s4Com + "/",
	cms:windowHttp + "//cms.daoxila." + s4Com + "/",
	app:windowHttp + "//app.daoxila." + s4Com + "/",
	i:windowHttp + "//i.dxlfile." + s4Com + "/",
	net:"//s4.dxlfile." + s4Com + "/",
	imageNet:windowHttp + "//image.daoxila." + s4Net + "/",
	s1:windowHttp + "//s1.dxlfile." + s4Com + "/",
	s4:"//s4.dxlfile." + s4Com + "/",
	m:windowHttp + "//m.daoxila." + s4Com + "/",
	e:"http://event.daoxila." + s4Com + "/",
	newCom:windowHttp + "//sh.daoxila." + s4Com + "/",
	iq:windowHttp + "//iq.dxlfile." + s4Com + "/",
	n:"https://n.daoxila.com/",
	buy:"//buy.daoxila." + s4Com + "/",
	img:"https://img.dxlfile.com/"
}

var dxlGALoginStatus = "unknown";
var dxlCom = "daoxila." + s4Com;

$.ajaxSetup({cache:true});
var dxlfs = [
	{name:"ad",js:"public/js/jquery.mas.js",css:""},
	{name:"datepicker",js:"public/js/jquery.widgets.datepicker.js",css:"public/css/jquery.custom.css"},
	{name:"tools",js:"public/js/jquery.tools.js",css:""},
	{name:"dxlSlider",js:"public/js/jquery.dxlSlider2.js",css:""},
	{name:"dxldslider",js:"public/js/jquery.dxldslider.js",css:""},
	{name:"orders",js:"public/js/jquery.orders.js",css:"public/css/jquery.orders.css"},
	{name:"hotelOrder",js:"order/js/hotelOrder/1705.js",css:"order/css/hotelOrder/1705.css"},
	{name:"hssyOrder",js:"order/js/HunShaSheYingOrder/1602.js",css:"order/css/HunShaSheYingOrder/1411.css"},
	{name:"hunqing",js:"order/js/hunqing/1506.js",css:"order/css/hunqing/1506.css"},
	{name:"register",js:"order/js/register/1411.js",css:"order/css/register/1411.css"},
	{name:"yearend",js:"order/js/yearend/1412.js",css:"order/css/yearend/1412.css"},
	{name:"M-yearend",js:"order/js/M-yearend/1412.js",css:"order/css/M-yearend/1412.css"},
	{name:"uploadify",js:"public/js/jquery.uploadify.min.js",css:""},
	{name:"uploader",js:"public/js/plupload.full.min.js",css:""},
	{name:"searchTxt",js:"public/js/jquery.searchTxt.js",css:""},
	{name:"statistics",js:"public/js/jquery.statistics.js",css:""},
	{name:"fall",js:"public/js/jquery.fall.js",css:""},
	{name:"dxlShare",js:"public/js/jquery.dxlShare.js",css:""},
	{name:"dxlCountdown",js:"public/js/jquery.dxlCountdown.js",css:""},
	{name:"apply",js:"order/js/apply/1501.js",css:"order/css/apply/1501.css"},
	{name:"minisite",js:"order/js/minisite/1503.js",css:"order/css/minisite/1503.css"},
	{name:"dxlTab",js:"public/js/jquery.dxlTab.js",css:""},
	{name:"dxlComment",js:"public/js/jquery.dxlComment.js",css:""},
	{name:"flag",js:"order/js/flag/1508.js",css:"order/css/flag/1508.css"},
	{name:"elemtFixed",js:"public/js/jquery.elemtFixed.js",css:""},
	{name:"dxlCalendar",js:"public/js/jquery.dxlCalendar.js",css:""},
	{name:"login",js:"order/js/login/1501.js",css:"order/css/login/1501.css"},
	{name:"sortable",js:"public/js/jquery.sortable.js",css:""},
	{name:"evaluate",js:"public/js/jquery.evaluate.js",css:""},
	{name:"showImg",js:"public/js/jquery.showimg.js",css:""},
	{name:"ckplayer",js:"public/ckplayer/ckplayer.js",css:""},
	{name:"dxlXNKF",js:"public/js/dxlXNKF.js",css:""},
	{name:"dxlBubble",js:"order/js/dxlBubble/1504.js",css:""},
	{name:"dxlCompare",js:"tools/js/compare/1507.js",css:"tools/css/compare/1507.css"},
	{name:"dxlAudio",js:"public/js/dxlAudio/dxlAudio.js",css:""},
	{name:"dxlTalk",js:"order/js/talk/1508.js",css:"order/css/talk/1508.css"},
	{name:"buyOrder",js:"order/js/buyOrder/1510.js",css:""},
	{name:"eventOrder",js:"order/js/eventOrder/1601.js",css:""},
	{name:"dxlPageBrowse",js:"order/js/browse/1511.js",css:""},
	{name:"lifuOrder",js:"order/js/lifuOrder/1603.js",css:"order/css/lifu/1603.css"},
	{name:"receive",js:"order/js/receive/1605.js",css:"order/css/receive/1605.css"},
	{name:"crypto",js:"public/js/cryptojs.min.js",css:""}

];
	
$.extend(String.prototype,{
	'isPhone': function() {return Regular.call(this,/^(?:(?:1(?:3[4-9]|5[012789]|8[78])\d{8}|1(?:3[0-2]|5[56]|8[56])\d{8}|18[0-9]\d{8}|1[35]3\d{8})|14[57]\d{8}|170[059]\d{7}|17[13678]\d{8})$/);},
	'isMail': function() {return Regular.call(this,/^([_a-zA-Z\d\-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);},
	'isPassword': function() {return Regular.call(this,/^[a-zA-Z0-9_-]{6,18}$/);}, 
	'isName': function() {return Regular.call(this,/^[a-z0-9_-]{6,18}$/);},
	'isMoney': function() {return Regular.call(this,/^[1-9]\d*$/);},
	'isNull': function() {return $.trim(this) == "" ? false : true;},
	'isWeixin' :function (){return Regular.call(this,/^[a-zA-Z]{1}[a-zA-Z\d_-]{5,19}$/);},
	'isAjaxPhone': function(execute) {
		$.getJSON(dxlHttp.my + "jsonp/index?act=checkMoblie&account="+encodeURIComponent(this)+"&callback=?",function(data){
			$.isFunction(execute) ? execute(data) : "";
		});
    }
});
$.extend({
	"pctom":function(cb){
		if(navigator.userAgent.indexOf("iPhone") != "-1" || navigator.userAgent.indexOf("Android") != "-1" ){
			$.isFunction(cb) ? cb() : ""
		}
	},
	"cookie":function(name, value, options) {
	    if (typeof value != 'undefined') {
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString();
	        }
	        var path = options.path ? '; path=' + options.path : '';
	        var domain = options.domain ? '; domain=' + options.domain : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else {
	        var cookieValue = "";
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	},
	"getBrowser":function(){
		var u = window.navigator.userAgent.toLocaleLowerCase();
		var p = ""
		var b = "other";
		if(u.indexOf("windows") > 0){
			p = "windows";
			if(u.indexOf("msie") > 0){b = "msie";}
			else if(u.indexOf("firefox") > 0){b = "firefox";}
			else if(u.indexOf("chrome") > 0){b = "chrome";}
			else if(u.indexOf("opr") > 0){b = "opera";}
		}else if(u.indexOf("android") > 0){
			p = "android";
			if(u.indexOf("uc") > 0){b = "uc";}
			else{b="android"}
		}else if(u.indexOf("iphone") > 0){
			p = "iphone";
			b = "safari";
		}else if(u.indexOf("ipad") > 0){
			p = "ipad";
			b = "safari";
		}else if(u.indexOf("macintosh") > 0){
			p = "macintosh";
			if(u.indexOf("chrome") > 0){b = "chrome";}
			else if(u.indexOf("safari") > 0){b = "safari";}
		}
		return p + "-" + b;
	},
	"isUrlPar":function(k,p){
		var u = p || window.location.search;
		var reg = new RegExp("(^|&)" + k + "=([^&]*)(&|$)", "i");
		var r = u.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]); return "";
	},
	"dxlInclud":function(d,b){	
		var _data = d;
		var _dataLength = _data.length;
		var _dataLengthNum = 0;
		var head = $("head");
		var jsObjAct = function(fs){
			$.getScript(dxlHttp.s4 + fs.js + "?v=" + dxlHttp.v,function(){
				fs.loading = true;
				ajaxRct();
			});
		}
		var ajax = function (){
			$(dxlfs).each(function(index, fs) {
				if(_data[_dataLengthNum] == fs.name && !fs.loading){
					if(!fs.css == ""){
						var cssObj = $('<link href="'+ dxlHttp.s4 + fs.css + "?v=" + dxlHttp.v + '" rel="stylesheet">');
						var cssObjElement = cssObj[0];
						var csson = true;
						cssObj.appendTo("head");
						if(cssObjElement.attachEvent){
							cssObjElement.attachEvent("onload",function(){if(csson){jsObjAct(fs);}})
						}else{
							cssObjElement.onload = function(){if(csson){jsObjAct(fs);}}
						}
						var ua = navigator.userAgent.toLocaleLowerCase();
						if((ua.indexOf("windows")  != -1) && (ua.indexOf("safari/534.57") != -1)){jsObjAct(fs);csson=false;}
						if(+navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536){jsObjAct(fs);csson=false;}
					}else{
						jsObjAct(fs);
					}
				}else if(_data[_dataLengthNum] == fs.name){
					ajaxRct();
				}
			});
		}
		var ajaxRct = function(){
			_dataLengthNum++;
			_dataLengthNum < _dataLength ? ajax() : $.isFunction(b) ? b() : "";
		}
		ajax();
	},
	"dxlAddCity":function(u){
		var a = u.split("#");
		var b = a[0].split("?");
		var c = b[0] + "_City-" + ($.cookie("city") || "sh");
		if(b[1]){
			c += "?";
			c += b[1]; 
		}
		if(a[1]){
			c += "#";
			c += a[1]; 
		}
		return c;
	},
	"dxlAarrow":function(){
		var b = $("body");var ww = $(window).width();
		ww <= 1240 ? b.addClass("narrow") : "";b.attr("id",$.getBrowser().split("-")[0]);
	},
	"dxlfsInheritance":function(arr) {
		$(arr).each(function() {dxlfs.push(this);});
	},
	"dxlBackgroundShow":function(type,execute){
		$.dxlBackgroundHide();
		$("body").append('<div id="dxlBackgroundDiv" style="z-index:999; position:absolute; top:0; left:0; filter:alpha(opacity=70); opacity: 0.7; -moz-opacity:0.7;"></div>');
		type == "fadeIn" ? $("#dxlBackgroundDiv").hide().fadeIn() : "";
		var dxlbd = $("#dxlBackgroundDiv");
		function dxlBackgroundDivFun(){
			dxlbd.css({"width":$(window).width(),"height":$(document).height()})
		}
		$(window).on("resize.dxlbd",dxlBackgroundDivFun);
		$(window).on("scroll.dxlbd",dxlBackgroundDivFun);
		dxlBackgroundDivFun();
		$.isFunction(execute) ? execute(data) : "";
	},
	"dxlBackgroundHide":function(type,execute){
		if(type == "fadeOut"){
			$("#dxlBackgroundDiv").fadeOut(function(){
				$("#dxlBackgroundDiv").remove();
			})
		}else{
			$("#dxlBackgroundDiv").remove();
		}
		$(window).off("resize.dxlbd");
		$(window).off("scroll.dxlbd");
	},
	"dxlCollection":function(cs,execute){
		var _cs = {id:"",name:"",url:""};
		$.extend(_cs,cs);	
		$.getJSON(dxlHttp.com + "jsonp/?act=addFavoriteHotel&" +  $.param(_cs) + "&callback=?",function(data){
			$.isFunction(execute) ? execute(data) : "";
		});	
	},
	"dxlLoginPage":function(url){
		$.cookie("from_url_click",url ? url : window.location,{domain:"daoxila." + s4Com,path:"/"});
		window.location = dxlHttp.my + "user/login";
	},
	"dxlLoginCallback":function(url){
		var u = $.cookie("from_url_click") || dxlHttp.www;
		$.cookie("from_url_click","",{domain:"daoxila." + s4Com,path:"/"});
		window.location = u;
	},
	"dxlGetJSON":function(atc,jsonPar,ex){
		$.getJSON(dxlHttp.com + "jsonp/?act=" + atc + "&" + $.param(jsonPar) + "&callback=?",function(data){
			$.isFunction(ex) ? ex(data) : "";
		});
	},
	"dxlGaPageTracker":function(xnUrl,orderFrom){
		try{
			ga('send','pageview',xnUrl);
			dxlDaPar.action_type = "order_action";
			dxlDaPar.order_url = xnUrl;
			dxlDaAction();
		}catch(e){};
	},
	"dxlLodinShow":function(execute){
		$.getJSON(dxlHttp.my + "jsonp/?act=checkloginStatus&callback=?",function(data){
			if(data.code == 1){
				var name = data.user_name ? data.user_name : "新会员";
				if($("#topTools .login .loginCon").length > 0){
					$("#topTools .login .loginCon").html("<span>您好 " + name + "</span><a href='"+dxlHttp.my+"user/logout' target='_self'>退出</a>");
				}else{
					$("#topTools .login span").html("您好 " + name + " <a href='"+dxlHttp.my+"user/logout' target='_self'>退出</a> | <a href='"+dxlHttp.my+"user/info' target='_self'>会员中心</a>");
				}
				dxlGALoginStatus = "return";
			}
			$.isFunction(execute) ? execute(data) : "";
			
		});
	},
	"dxlWeiboShare":function(text,img,url){
		var _img = img ? img : dxlHttp.s4 + "public/img/logo/normal.png";
		var _url = url ? url : dxlHttp.www;
		window.open("http://service.weibo.com/share/share.php?searchPic=false&url=" + encodeURIComponent(_url) + "&appkey=3933900156&title=" + encodeURIComponent(text) + "&pic=" + encodeURIComponent(_img) +"&ralateUid=&language=");
	},
	

	"dxlCustomer":function(){
		var configID = "";
		var skillId = "";
		
		function sp(u){
			return dxlWin.href.indexOf(u) != -1 ? true : false;
		}
	
		if(sp('daoxila.com/HunYan') || (sp('m.daoxila.com') && sp('/HunYan'))) {
			configID = "231692";skillId = "12625";
		} else if(sp('daoxila.com/HunShaSheYing') || (sp('m.daoxila.com') && sp('/HunShaSheYing'))) {
			configID = "231693";skillId = "12623";
		}else if(sp('daoxila.com/HunQing') || (sp('m.daoxila.com') && sp('/HunQing'))) {
			configID = "231694";skillId = "12626";
		}else if(sp('daoxila.com/MiYue') || (sp('m.daoxila.com') && sp('/MiYue'))) {
			configID = "231695";skillId = "12627";
		}else if(sp('daoxila.com/Mall') || (sp('m.daoxila.com') && sp('/Mall'))) {
			configID = "231698";skillId = "12628";
		}else if(sp('daoxila.com/HunChe') || (sp('m.daoxila.com') && sp('/HunChe'))) {
			configID = "231787";skillId = "12636";
		}else{
			configID = "185975";skillId = "12618";
		}

		window.open('//chat10.live800.com/live800/chatClient/chatbox.jsp?configID='+configID+'&skillId='+skillId+'&companyID=378034&jid=3193679090&enterurl=' + encodeURIComponent(window.location.href) + '&pagetitle=' + encodeURIComponent($("title").text()) + '&firstEnterUrl=' + encodeURIComponent(window.location.href) + '&lan=zh&tm='+new Date().getTime(), 'dxl'+new Date().getTime(), 'height=520, width=720, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
	},
	"dxlmg":function(dxlJson){
		//var json = {"order_from":"","region":"","price":"","desk":"","date":""};
		//json = $.extend(json,dxlJson);
	},
	"dxlSmsSend":function(par,callback){
		var json = {
			"mobile":"",
			"type":"",
			"is_login":"0",	//是否做登陆操作 1为登录
			"img_code":""	//图形验证码
		}
		json = $.extend(json,par);
		$.getJSON(dxlHttp.com + "jsonpnew/?act=sendSmsEvo&" + $.param(json) + "&callback=?",function(d){
			$.isFunction(callback) ? callback(d) : "";
		});
	},
	"dxlSmsCheck":function(par,callback){
		var json = {
			"mobile":"",	//手机号
			"type":"",		//短信模版
			"code":""		//验证码
		}
		json = $.extend(json,par);
		$.getJSON(dxlHttp.com + "jsonpnew/?act=verifySmsCode&" + $.param(json) + "&callback=?",function(d){
			$.isFunction(callback) ? callback(d) : "";
		});
	},
	"dxlPraise":function(par,callback){
		var json = {
			serviceType:"", 	//频道业务类型
			entityType:"",		//实体类型
			entityId:""			//点评ID
		}
		json = $.extend(json,par);
		$.getJSON(dxlHttp.com + "jsonpnew/?act=praise&" + $.param(json) + "&callback=?",function(d){
			if(d.code == 1){
				$.isFunction(callback) ? callback(d) : "";	
			}else{
				$.alert(d.msg);
			}
		});
	},
	"alert":function(t){
		var h = $('<div id="dAlert"><div>' + t + '</div></div>');
		h.appendTo("body");
		h.dxlLayerFixedShow();
		h.fadeIn(300);
		setTimeout(function(){h.fadeOut(300,function(){h.remove();})},2000);
	},
	"dxlProtocolSwitch":function(){
		if(dxlWin.protocol == "http:"){
			window.location.href = window.location.href.replace("http:","https:");
		}
	}
});

$.fn.extend({
	"dxlSelect":function(callback){
		var _this = $(this);
		_this.on("click",function(event){
			event.stopPropagation();
			_this.find("ul").show();
			_this.find("i").addClass("cur");
		})
		_this.find("ul li").on("click",function(event){
			event.stopPropagation();
			$(this).parent().hide();
			_this.find("i").removeClass("cur");
			_this.find("span").attr("val",$(this).attr("val"));
			_this.find("span").text($(this).text());
			$.isFunction(callback) ? callback($(this)) : "";
		})
		$(document).on("click",function(){
			_this.find("ul").hide();
			_this.find("i").removeClass("cur");
		});
		
	},
	"dxlLayerFixedShow":function(position){
		var _this = $(this);
		var _position = position;
		if (dxlHttp.ie) {
			$(window).on("scroll.dxlsc",function(){_this._dxlLayerFixedShow(_position);});
		}
		$(window).on("resize.dxlsc",function(){_this._dxlLayerFixedShow(_position);}).resize();
	},
	"_dxlLayerFixedShow":function(position){
		var _this = $(this);
		var ie = dxlHttp.ie;
		var def = {
			w:$(window).width()/2,
			h:($(window).height()/2) - 40,
			obj_w:_this.width()/2,
			obj_h:_this.height()/2,
			top:"auto",
			left:"auto",
			right:"auto",
			bottom:"auto"
		}
		if(_this.parent().css("position") == "relative"){
			var _thisRelative = _this.parent();
			if(ie){
				def.w = (_thisRelative.width()/2); 
			}else{
				def.w = _thisRelative.offset().left + (_thisRelative.width()/2);
			}
		}
		_this.css("position",ie ? "absolute" : "fixed");
		def.top = def.h - def.obj_h;
		def.top <= 0 ? def.top = 0 : "";
		def.left = def.w - def.obj_w;
		switch(position){
			case "top":def.top = 0;break
			case "left":def.left = 0;break
			case "right":def.left = "auto";def.right = 0;break
			case "bottom":def.top = "auto";def.bottom = 0;break
		}
		if(ie){
			if(position == "bottom"){
				def.bottom = "auto";
				def.top = ($(document).scrollTop() + $(window).height()) - _this.height();
			}else{def.top += $(document).scrollTop();}
		}
		_this.css({"left":def.left,"top":def.top,"right":def.right,"bottom":def.bottom});
		return _this;
	},
	"dxlLazyload":function(execute){
		var _obj = $(this);
		if(_obj.length <= 0) return false;
		function dxlLazyloadFun(){
			if(_obj.position().top < ($(document).scrollTop() + $(window).height()) && !_obj.attr("show")){
				_obj.attr("show",true);
				_obj.find("img[_src]").each(function(index, element) {
					$(this).attr("src",$(this).attr("_src")).removeAttr("_src").hide().fadeIn();
				});
				$.isFunction(execute) ? execute(_obj) : "";
			}
		}
		$(window).on("scroll",dxlLazyloadFun);
		dxlLazyloadFun();
	},
	"dxlLayerFixedHide":function(){
		var _this = $(this);
		_this.css("position",dxlHttp.ie ? "inherit" : "static");
		dxlHttp.ie ? $(window).off("scroll.dxlsc") : "";
		$(window).off("resize.dxlsc");
	},
	"dxlCountdown":function(p){
		var _this = $(this);
		var _jsObj = "";
		var _jsNum = 60;
		var par = {
			djsObj:_this,				//显示对象
			djsNum:_jsNum,				//读秒
			firstText:"",
			sendText:"重新发送验证码",
			waitText:"秒后重新发送",
			classText:"cur",
			mobile:"dxlPhone",
			sendError:"dxlPhone",				//手机号验证失败
			sendAction:""				//发送验证码回调
		}
		par = $.extend(par,p);
		_this.on("click",thisClick);
		par.firstText == "" ? thisClick() : par.djsObj.text(par.firstText);
		function thisClick(){

			if(par.mobile != "dxlPhone" && !par.mobile.val().isPhone()){				
				par.djsObj.text(par.sendText);
				$.isFunction(par.sendError) ? par.sendError() : "";
				return false;
			}
			_this.off("click");
			par.djsObj.text(par.djsNum + par.waitText);
			_this.addClass(par.classText);
			$.isFunction(par.sendAction) ? par.sendAction() : "";
			_jsObj = window.setInterval(function(){
				par.djsNum--;
				if(par.djsNum >= 0){
					par.djsObj.text(par.djsNum + par.waitText);
				}else{
					par.djsNum = _jsNum;
					par.djsObj.text(par.sendText);
					clearInterval(_jsObj);
					//_this.on("click",thisClick);
					_this.removeClass(par.classText);
				}
			},1000)
		}
	}
});

function Regular(z){return (new RegExp(z).test(this));}


//dxlAnalytics
if(!$.cookie("_da")){
	$.cookie("_da",'DA.' + Math.round(Math.random()*2147483647)+ '.' + new Date().getTime(),{expires:365,domain:"daoxila.com",path:"/"});
}

var dxlDaPar = {
	"action_type":"in_page",//普通浏览
	"order_url":"",//虚拟页面url
	"in_time":new Date().getTime(),
	"url_referrer":document.referrer,
	"url":dxlWin.href,
	"pid":$.cookie("_da") + dxlWin.href + new Date().getTime() + Math.random(),
	"keyword":"",
	"gid":$.cookie("_da"),
	"search":$.cookie("utm_source") || $.isUrlPar("utm_source"),
	"bType":$.getBrowser().split("-")[1],
	"bVersion":"",
	"bJava":"",
	"bFlash":"",
	"bOS":$.getBrowser().split("-")[0],
	"bScr":$(window).width() + "x" + $(window).height(),
	"bColor":"",
	"bLang":navigator.language,
	"bDevice":"",
	"cid":$.isUrlPar("cid","?" + window.location.href.split("#")[1]),
	"v":Math.random()
}

function dxlDaAction(){
	$.getJSON('//da.daoxila.com/dxl_analytics_2.php?' + $.param(dxlDaPar) + "&callback=?");
}




// 搜索引擎来源记录cookie 2015/8/26
function searchEngineCookieSet() {
    // 声明变量
    var referrer = document.referrer,
        utm_source =$.isUrlPar("utm_source"),
    // 初始化obj对象
        obj = {
            'utm_source': '',
            'utm_medium': '',
            'utm_campaign': '',
            'utm_term': '',
            'utm_content': '',
            'a_i': ''
        },
        options30 = {
            expires: 30,
            path: '/',
            domain: 'daoxila.com'
        },
        value;

    // 有referrer 且
    // 来源链接非到喜啦网站内部
    if(referrer && notFromDxl()) {
        setCookieFromReferrer();
    }

    // url含有utm_source查询参数
    if($.trim(utm_source) != "") {
        setCookieFromUrl();
    }

    // 判断referrer中是否存在daoxila.com
    // 2015/08/12
    function notFromDxl() {
        var _a, _hostname;
        _a = document.createElement('a');
        _a.href = referrer;
        _hostname = _a.hostname;
        return _hostname.indexOf('daoxila.com') === -1 ? true : false;
    }

    // seo 自然流量
    // 从referrer读取关键字
    // 如果url中没有utm_source，则设置_seo后缀，有不设置
    function setCookieFromReferrer() {
        var a, search, hostname, hostnameArray, keyReg, keyArray, searchHasQuestion, hostnameReg, isFrom6SearchEngine;
        a = document.createElement('a');
        a.href = referrer;
        hostname = a.hostname;
        searchHasQuestion = a.search;
        hostnameReg = /(baidu|so|sogou|google|bing|sm)/;
        keyReg = /(?:^|&)(wd|q|query|keyword|word)=([^&]*)(?:&|$)/;
        isFrom6SearchEngine = hostnameReg.test( hostname );
        hostnameArray = hostname.match( hostnameReg );

        // 如果来自6个搜索引擎
        if( isFrom6SearchEngine ) {

            // 如果 referrer 有查询参数
            if( search = searchHasQuestion.slice(1) ) {
                // 如果匹配到keyReg关键词的key，则设置utm_term
                if( keyArray = search.match( keyReg ) ) {
                    obj.utm_term = decodeURIComponent( keyArray[2] );
                }
            }

            obj.utm_medium = (dxlHost[dxlHost.length - 1] === 'm' ? 'wap' : 'pc') + "_" + decodeURIComponent(hostnameArray[1]) + "_seo";

        } else {
            // 来自其他seo数据
            obj.utm_term = hostname;
            obj.utm_medium = (dxlHost[dxlHost.length - 1] === 'm' ? 'wap' : 'pc') + "_referral";
        }

        obj.utm_source = "seo";

        // 设置cookie
        for (var key in obj) {
            if(value = obj[key] || "", obj.hasOwnProperty(key)) {
                $.cookie(key, value, options30);
            }
        }
    }

    // 通过url来设置cookie
    function setCookieFromUrl() {
        // 从url中读取参数
        obj.utm_source = decodeURIComponent( $.isUrlPar( 'utm_source' ) );
        obj.utm_medium = decodeURIComponent( $.isUrlPar( 'utm_medium' ) );
        obj.utm_campaign = decodeURIComponent( $.isUrlPar( 'utm_campaign' ) );
        obj.utm_term = decodeURIComponent( $.isUrlPar( 'utm_term' ) );
        obj.utm_content = decodeURIComponent( $.isUrlPar( 'utm_content' ) );
        obj.a_i = decodeURIComponent( $.isUrlPar( 'a_i' ) );

        // 设置cookie
        for (var key in obj) {
            if(value = obj[key] || "", obj.hasOwnProperty(key)) {
                $.cookie(key, value, options30);
            }
        }
    }

}



// 页面body写入cookie
function bodyCookieSet() {
	var bodyDcJson = $("body").attr('dc'),bodyDcObj;
	if(bodyDcJson && (bodyDcObj = $.parseJSON(bodyDcJson))) {
		for(var key in bodyDcObj) {
			if (bodyDcObj.hasOwnProperty(key)) {
				$.cookie(key, bodyDcObj[key], {
					expires: 365,
					path: '/',
					domain: 'daoxila.com'
				});
			}
		}
	}
}


$(document).ready(function(){

	searchEngineCookieSet();
	bodyCookieSet();
	dxlDaAction();
	$.cookie("city") ? dxlHttp.newCom = windowHttp + "//" + $.cookie("city") + ".daoxila." + s4Com + "/" : "";

	//dxlEvent
	$("body").on("click","[dxlEvent]",function(){
		dxlDaPar.action_type = "in_page_custom";//点击事件
		dxlDaPar.dxlEvent = $(this).attr("dxlEvent");
		dxlDaAction();
	});
	
});

//UA
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//s4.dxlfile.com/public/statistics/analytics.js','ga');

ga('create', 'UA-17330707-1', 'daoxila.com');
ga('send', 'pageview');


//Baidu
if(dxlHost[2] == "m" || (dxlHost[2] == "event" && window.location.href.indexOf("M-") != -1)){
	var _hmt = _hmt || [];
	(function() {var hm = document.createElement("script");hm.src = "//hm.baidu.com/hm.js?38d51f55f078dc3453ad8bbee56abcb4";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);})();
}else{
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F1d2519efe52fbcddc471e1b2ee80eb9e' type='text/javascript'%3E%3C/script%3E"));
}


//PTMind
window._pt_lt = new Date().getTime();