$(function (){
    var _win = $(window);
    _win.on("resize" ,function (){
        $("html").css("fontSize",_win.width()/3.2);
    }).resize();

    //获取城市
    var defaultCity = $.isUrlPar("city") ? $.isUrlPar("city") : $.cookie("city") ? $.cookie("city") : "sh";  
    var $region = $.isUrlPar("region");
    var $style = $.isUrlPar("style");
    var action_info = "";
    //酒店请求 数据  参数 赋值
    if($region || $style) {
        action_info = $region ?  $region :  $style;
    }

    // 页面初始化
    getData();
    selectUi($('.city'));
    initCity(defaultCity);

    //城市下拉列表框选中触发函数
    function selectUi($obj, callback) {
        var select = $obj.find('select'),
            span   = $obj.find('span');
        select.on('change', function () {
            span.text(select.find('option:selected').text());
            span.attr("city" ,select.find('option:selected').val());
            if (typeof(callback) == 'function') callback();
        });
    }

    // 获取城市数据 绑定change事件
    function getData() {
        $.getJSON(dxlHttp.m + "index/jsonpnew/index?act=getCity&callback=?", function (res) {
            if (res.code == "1") {
                var str  = "",
                    city = $('#city');
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].name) {
                        str += '<option id="' + res.data[i].id + '" value="' + res.data[i].url + '">' + res.data[i].name + '</option>';
                    }
                }
                city.html(str)
                    .change(function () {   //绑定change  init其他表单的数据
                        // 切换城市中文
                        defaultCity = $('.selecty_city_name').attr("city");
                        initCity(defaultCity);
                    });

                // 初始化城市
                var city_name = $("#city option[value ="+defaultCity+"]").text();
                $('.selecty_city_name').text(city_name);
            }
        });
    }

    //切换城市cookie 获取hotel 列表数据
    function initCity (defaultCity){
        $.getJSON(dxlHttp.n + "jsonp/?act=changecity&city="  + defaultCity + "&callback=?", function(data) {});
       
        // 切换hotel 列表数据
        $.getJSON( "//m.daoxila.com/"+defaultCity+ "/HunYan-List/" + action_info + "?test=dxl&callback=?", function(data){
            data = data.hotelList.entities.slice(0,5);
            hotelList(data);
        })

        // 广告位
        $.dxlInclud(["ad"],function(){
            $.admAjaxData("113,114,115",function(execute){  //广告位ID，回调函数
                console.log(232324);
                $(".banner_1").DxlAdm({
                    admId:113,//必填 广告位id
                    admType:"img",//必填 广告类型
                });

                $(".banner_2").DxlAdm({
                    admId:114,//必填 广告位id
                    admType:"img",//必填 广告类型
                });
                $(".banner_3").DxlAdm({
                    admId:115,//必填 广告位id
                    admType:"img",//必填 广告类型
                });
            });
        
        });
    }

    // 婚宴酒店列表渲染函数
    function hotelList(data){
        console.log(data);
        var html = "";
        data.forEach(function(element) {
            html += '<li>' +
                '<img src="'+ element.cover +'" alt="">' +
                '<div class="hotel_name">'+ element.name +'</div>' +
                '<div class="price_add clearfix">'+
                    '<div class="hotel_price">¥'+ element.priceMin +'起</div>' +
                    '<div class="hotel_add">'+ element.region+'</div>' +
                '</div>' +
            '</li>';
        }, this);
        $(".hotel_lis").html(html);
    }


    // 点击的交互事件
    $.dxlInclud(['M-hotelOrder'], function () {
        $(".hotel_lis").touchClick("img" ,function (){
                console.log("*****************")
                // $(".pop-box input").blur();
                // var _this = $(this);
                // if (_this.attr("submited") == "true") return;
                // _this.attr("submited", "true");
				// $.cookie("user[mobile]") ? $('#popHunyan #phone').val($.cookie("user[mobile]")) : "";
                // var phone = $('#popHunyan #phone').val();
                // if (!phone.isPhone()) {
                //     _this.attr("submited", "");
                //     $.mAlert("请输入正确的手机号码");
                // } else {
                //     //下单
                    
                // }

                $("#popHunyan").show();
                $("body").addClass("active");

                $("#popHunyan .cancel").touchClick(function (){
                    $("#popHunyan").hide();
                    $("body").removeClass("active");
                })

                
        })
    });

    $(".btn_submit").touchClick(function (){
        var phone = $(this).parent().parent().find(".input_item_div input").val() || "";
        if(!phone.isPhone()){
            $.mAlert("请填写正确的手机号");
            return ;
        }
        // 虚拟路径统计
        if($(this).parent().parent().hasClass("content")){
            $.dxlGaPageTracker("/VPTracker/HunYan/Event/Click2?s="+$.cookie("utm_source") +"&ct="+$.cookie("utm_content") +"&t="+$.cookie("utm_term") +"&cp="+$.cookie("utm_compaign") +"&m="+$.cookie("utm_medium") +"&city="+$.cookie("city_id")); 
        }else {
            $.dxlGaPageTracker("/VPTracker/HunYan/Event/Click?s="+$.cookie("utm_source") +"&ct="+$.cookie("utm_content") +"&t="+$.cookie("utm_term") +"&cp="+$.cookie("utm_compaign") +"&m="+$.cookie("utm_medium") +"&city="+$.cookie("city_id")); 
        }
        $.hotelOrder({
            order_from    : 'Wap_' + defaultCity + '_HunYan_Hotel2017',
            mobile        : phone ,
            hotel_class   : "不限",
            callbackUrl   : dxlHttp.cityCom +"M-tools/Hotel2017/orderComplete.html",     //下单成功后跳转的URL
            remark        : "",
            e:true,
            orderOkCallback:function(){
                    window.location.href= dxlHttp.cityCom +"M-tools/Hotel2017/orderComplete.html";
            }
        });
    })
})