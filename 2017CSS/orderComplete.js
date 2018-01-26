$(function (){
    var _win = $(window);
    _win.on("resize" ,function (){
        $("html").css("fontSize",_win.width()/3.2);
    }).resize();

    var defaultCity = $.isUrlPar("city") ? $.isUrlPar("city") : $.cookie("city") ? $.cookie("city") : "sh";
    $(".hotel a").attr("href","//m.daoxila.com/"+defaultCity+ "/HunYan-List");

    // 页面初始化
    getData();
    selectUi($('.city'));


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
                    });

                // 初始化城市
                var city_name = $("#city option[value ="+defaultCity+"]").text();
                $('.selecty_city_name').text(city_name);
            }
        });
    }
})