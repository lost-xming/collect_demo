;
$.dxlfsInheritance([
	{name:"touchSlider",js:"public/js/jquery.touchslider.js",css:""},
	{name:"touchAlbums",js:"public/js/dxlAlbumsScrollSlides.js",css:""},
	{name:"dxlIos",js:"public/js/dxlApp/jquery.iosApp.js",css:""},
	{name:"dxlAndroid",js:"public/js/dxlApp/jquery.androidApp.js",css:""},
	{name:"dxlTouchEvent",js:"public/js/jquery.dxlTouchEvent.js",css:""},
	{name:"dxlMLogin",js:"order/js/M-login/1504.js",css:"order/css/M-login/1504.css"},
	{name:"dxlMApply",js:"order/js/M-apply/1502.js",css:"order/css/M-apply/1502.css"},
	{name:"M-search",js:"order/js/M-search/1503.js",css:"order/css/M-search/1503.css"},
	{name:"M-hunqing",js:"order/js/M-hunqing/1506.js",css:"order/css/M-hunqing/1506.css"},
	{name:"lrz2",js:"public/js/lrz.js",css:""},
	{name:"M-hotelOrder",js:"order/js/M-hotelOrder/1505.js",css:"order/css/M-hotelOrder/1505.css"},
	{name:"M-hssyOrder",js:"order/js/M-HunShaSheYingOrder/1505.js",css:"order/css/M-HunShaSheYingOrder/1505.css"},
	{name:"M-miyueOrder",js:"order/js/M-miyue/1506.js",css:"order/css/M-miyue/1506.css"},
	{name:"M-huncheOrder",js:"order/js/M-hunche/1512.js",css:"order/css/M-hunche/1512.css"},
   	{name:"dxlWapDatePicker", js:"public/js/dxlWapDatePicker.js",css:"public/css/dxlWapDatePicker.css"},
	{name:"pagepiling", js:"public/js/jquery.pagepiling.js",css:""},
	{name:"wapToApp", js:"order/js/wapToApp/wapToApp.js",css:""},
	{name:"hotelGiftDialog", js:"order/js/M-hotelGiftDialog/1604.js",css:"order/css/M-hotelGiftDialog/1604.css"},
	{name:"M-lifuOrder", js:"order/js/M-lifu/1602.js",css:"order/css/M-lifuOrder/1602.css"},
	{name:"M-receive",js:"order/js/M-receive/1605.js",css:"order/css/M-receive/1605.css"},
	{name:"dxlArrow",js:"public/js/dxlArrow.js",css:"public/css/dxlArrow.css"},
	{name:"dxlMusic",js:"public/js/dxlMusic.js",css:"public/css/dxlMusic.css"}
]);


$.extend({
	//环境初始化
	"mAppInit":function(opt){
		var par = {
			"appleWeixin":"",	//iphone微信
			"appleApp":"",		//iphoneApp
			"appleBrowser":"",	//iphone浏览器
			"iPadWeixin":"",	//ipad微信
			"iPadApp":"",		//ipadApp
			"iPadBrowser":"",	//ipad浏览器
			"androidWeixin":"",	//android微信
			"androidApp":"",	//androidApp
			"androidBrowser":"",//android浏览器
			"otherBrowser":""	//其它浏览器
		}
		$.extend(par,opt);
		var ua = window.navigator.userAgent.toLowerCase();
		//iphone
		if(navigator.userAgent.indexOf("iPhone") != "-1"){
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				$.isFunction(par.appleWeixin) ? par.appleWeixin() : "";
			}else if(navigator.userAgent.indexOf("dxlapp-iphone") != "-1"){
				$.dxlInclud(["dxlIos"],function(){$.isFunction(par.appleApp) ? par.appleApp() : "";});
			}else{
				$.isFunction(par.appleBrowser) ? par.appleBrowser() : "";
			}
		//ipad
		}else if(navigator.userAgent.indexOf("iPad") != "-1"){
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				$.isFunction(par.iPadWeixin) ? par.iPadWeixin() : "";
			}else if(navigator.userAgent.indexOf("dxlapp-ipad") != "-1"){
				$.dxlInclud(["dxlIos"],function(){$.isFunction(par.iPadApp) ? par.iPadApp() : "";});
			}else{
				$.isFunction(par.iPadBrowser) ? par.iPadBrowser() : "";
			}
		//android
		}else if(navigator.userAgent.indexOf("Android") != "-1"){
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				$.isFunction(par.androidWeixin) ? par.androidWeixin() : "";
			}else if(navigator.userAgent.indexOf("dxlapp-android") != "-1"){
				$.dxlInclud(["dxlAndroid"],function(){$.isFunction(par.androidApp) ? par.androidApp() : "";});
			}else{
				$.isFunction(par.androidBrowser) ? par.androidBrowser() : "";
			}
		//other
		}else{
			$.isFunction(par.otherBrowser) ? par.otherBrowser() : "";
		}
	},
	//返回顶部
	"mTopCall":function(){
		$("body").append('<div id="backTop"></div>');
		var backTop = $("#backTop");
		$(window).on("scroll",function(){
			if(parseFloat($(window).scrollTop()) > 300){
				backTop.show();
			}else{
				backTop.hide();
			}
		})
		backTop.touchClick(function(event){
			event.stopPropagation();
			event.preventDefault();
			$('body,html').animate({scrollTop:0},100);
		});
	},
	//模拟原生alert提示  自动关闭
	"mAlert":function(msg,callback){
		if($("#mAlert").size() == 0){   //避免重复添加
			var str = '<div id="mAlert"><div class="mAlertBox">' +
						'<div class="alertContent"></div>' +
					  '</div></div>';
			$("body").append(str);
		}
		var myDialog = $("#mAlert");

		myDialog.find(".alertContent").text(msg);
		myDialog.dxlLayerFixedShow();

		setTimeout(toCloseAlert,3000);  //自动关闭

		function toCloseAlert(){//关闭弹出层
			myDialog.fadeOut(800,function(){
				myDialog.remove();
			})
			$.isFunction(callback) ? callback() : "";
		}
	},
	/**
	***判断微信添加底部APP下载条
	***/
	"mAppDown":function(){
		if($.cookie("wxAppClose")) return;

		//微信
		$.mAppInit({
			"appleWeixin":wxAppDown,
			"iPadWeixin":wxAppDown,
			"androidWeixin":wxAppDown
		})

		//下载浮层dom
		function wxAppDown(){
			if(window.location.href.indexOf("event") != -1) return;
			var html = '<section id="mAppDownBot">' +
						'<div class="appDownDiv">' +
							'<span class="close"></span>' +
							'<span class="topBg"></span>' +
							'<div class="words clearfix">' +
								'<span class="le"></span>' +
								'<span class="mid">到喜啦APP<br>与您分享结婚中的故事</span>' +
								'<span class="ri">立即下载</span>' +
							'</div>' +
						'</div>' +
					'</section>';
			$('body').append(html);

			$('#mAppDownBot .close').touchClick(function(e){
				e.stopPropagation();
				e.preventDefault();
				$('#mAppDownBot').hide();
				$.cookie("wxAppClose",1,{expires:7,domain:"daoxila." + s4Com,path:"/" });
			});

			$('#mAppDownBot .words .ri').touchClick(function(e){
				window.location.href = dxlHttp.m + "app?utm_source=App&utm_content=ziyou&utm_term=BBS";
			})
		};
	},
	"mGetLocation":function(callback){
		var getUrl = dxlHttp.m + "index/jsonp/getCityByIp/?callback=?";
		$.getJSON(getUrl,function(data){
			mlocalStorage.load(function(){
				$.isFunction(callback) ? callback(data) : "";
			})
		})
	},
    // 专题回退按钮
    "eventRedirect": function(url) {
        var newUrl = url.split('#')[0];
        var hashHere = location.hash;
        newUrl += (url.indexOf('?') == -1 ? '?eventBackUrl=' : '&eventBackUrl=') + window.location.href;
        window.location = newUrl + hashHere;

    },
	"mlocationJudge":function(callback){//城市定位
		$.mGetLocation(function(data){
			function dingweiShow(){
				if(confirm("系统定位到您目前在" + data.data.city_name + "市，是否切换")){
					mPublicJson.city = {};
					mPublicJson.city.cityName = data.data.city_name;
					mPublicJson.city.cityShort = data.data.city_short;
					$.cookie("city2",data.data.city_short,{expires:7,domain:"daoxila." + s4Com,path:"/" });
					mlocalStorage.save(function(){
						window.location.href = dxlHttp.m + data.data.city_short + "/";
					});
				}else{
					mPublicJson.city.cityShort = $.cookie("city");
					mlocalStorage.save();
					$.cookie("city2",$.cookie("city"),{expires:7,domain:"daoxila." + s4Com,path:"/" });
				}
				$.cookie("city3",data.data.city_short,{expires:7,domain:"daoxila." + s4Com,path:"/" });
			}

			if(data.code == 1){   //合作城市
				//首次进来
				if($.cookie("city2") == null && $.cookie("city") != data.data.city_short){
					dingweiShow();
				}
				//IP变化
				else if($.cookie("city2") != null && $.cookie("city3") != data.data.city_short){
					dingweiShow();
				}
				//用户手动选择  不提示
				else{
					mPublicJson.city.cityShort = $.cookie("city");
					mlocalStorage.save();
					$.cookie("city2",$.cookie("city"),{expires:7,domain:"daoxila." + s4Com,path:"/" });
					$.cookie("city3",data.data.city_short,{expires:7,domain:"daoxila." + s4Com,path:"/" });
				}
			}else if(data.code == 2){//非合作城市
				if($.cookie("city2") == null || $.cookie("city2") == "noCity"){  //首页进入时无法定位
					$.cookie("city2","noCity",{expires:7,domain:"daoxila." + s4Com,path:"/" });
					$.cookie("city3","noCity",{expires:7,domain:"daoxila." + s4Com,path:"/" });
					mPublicJson.city.cityShort = $.cookie("city");
					mlocalStorage.save(function(){
						//var msg = data.msg ? data.msg : "";
						window.location.href = "/city";
					});
				}else{   //非首页次进入
					$.cookie("city2",$.cookie("city"),{expires:7,domain:"daoxila." + s4Com,path:"/" });
					mPublicJson.city.cityShort = $.cookie("city");
					mlocalStorage.save();
				}

			}
			$.isFunction(callback) ? callback(data) : "";
		})
	}
});

$.fn.extend({
	"touchClick":function(select,callback){   //移动端 点击事件
		var se = (select != "" && !$.isFunction(select)) ? select : "";
		var cb = $.isFunction(select) ? select : callback;
		$(this).each(function(index, element) {
			var tc = false;
			$(this).on({
				"touchstart":function(){tc = true;},
				"touchmove":function(){tc = false;},
				"touchend":function(event){
					event.index = index;
					tc ? $.isFunction(cb) ? cb.call(element, event) : "" : "";
				}
			},se);
		});
	},
    "dbTouchClick": function(callback) {
        $(this).each(function(index, element) {
            var startPoint = {};
            var startTime, endTime;
            var _X, _Y;
            $(this).on("touchstart", function () {
                var event = arguments[0].originalEvent;
                startTime = event.timeStamp;
                if (endTime && (startTime - endTime < 200)) {
                    _X = Math.abs(event.touches[0].clientX - startPoint.X);
                    _Y = Math.abs(event.touches[0].clientY - startPoint.Y);
                    if(17 > _X && _Y < 17 && (typeof callback === "function")) {
                        callback(event);
                    }
                }
                startPoint.X = event.touches[0].clientX;
                startPoint.Y = event.touches[0].clientY;
            });
			$(this).on("touchmove", function () {
				endTime = 0;
			});
            $(this).on("touchend", function () {
                var event = arguments[0].originalEvent;
                if(event.touches.length === 0) {
                    endTime = event.timeStamp;
                }
            });
        });
    }
});
var mlocalStorage = {};
var mPublicJson = {};  //持久性本地存储值

mlocalStorage.load = function(callback){   //本地存储数据加载完成后……
	$.getJSON(dxlHttp.m + "index/jsonp/localToServerGetAll/?callback=?",function(data){
		if(data.mPublicJson == undefined){
			mPublicJson = {"city": {"cityName": "上海","cityShort": "sh"}};
			mlocalStorage.save();
		}else{
			mPublicJson = data.mPublicJson;
			if(mPublicJson.order){
				mPublicJson.order.hotel_url = encodeURIComponent(mPublicJson.order.hotel_url);
				mPublicJson.order.urlRedirect = encodeURIComponent(mPublicJson.order.urlRedirect);
			}
		}
		$.isFunction(callback) ? callback(data.mPublicJson) : "";
	});
}

mlocalStorage.save = function(key,val,callback){   //存储本地数据时需要save一下
	if(key != "undefined" && key != "" && !$.isFunction(key)){
		mPublicJson[key] = val;
	}else{
		callback = key;
	}

	$.getJSON(dxlHttp.m + "index/jsonp/localToServerSet/?key=mPublicJson&value=" + JSON.stringify(mPublicJson) + "&callback=?",function(deta){
		$.isFunction(callback) ? callback() : "";
	});

}

$(function(){

    $('body').on('click', '.eventRedirect', function(e) {
        e.preventDefault();
        $.eventRedirect($(this).attr('href'));
    });

	//有app=dxl标志的，隐藏返回及底部下载按钮
	if($.cookie("utm_medium") == "so" && $.cookie("utm_source") == "BD"){
		$("header .prev,footer .footAppDown").css("display","none");
	}
	//$.mAppDown();
})
