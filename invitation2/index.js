$(function (){
	var dataArr = json["templates"];

	// 循环加载css js
	$(dataArr).each(function(index, el) {

    //组合CSS JS后需删除的部分
		var url = './templates/' +  el["tplName"] + '/index',
		    cssUrl = url + ".css";

		creatCss(cssUrl);
		// creatScript(scriptUrl);
    setTimeout(function(){
      var de = eval(el["tplName"]);
      de(el);
    },1000)
    


    // 需放开的部分
    // var de = eval(el["tplName"]);
    // de(el);
	});



	//创建script 标签
	function creatScript(url){ 
		var head= document.getElementsByTagName('head')[0]; 
		var script= document.createElement('script'); 
		script.type= 'text/javascript'; 
		script.onload= function(){
		}
		script.src= url;
		head.appendChild(script);
	}
  

	// 创建link 标签
	function creatCss(url){
		var head= document.getElementsByTagName('head')[0]; 
		var link= document.createElement('link'); 
		link.rel= 'stylesheet';
		link.onload= function(){
		}
		link.href = url;
		head.appendChild(link);
	}

  //cover
  $(".styleMes .cover").css("background","url("+ json["cover"]['coverImg']+") no-repeat");
  $(".styleMes .cover .fa_car_text").text(json["cover"]["fa_car_text"]);
  $(".styleMes .cover .fa_bus_text").text(json["cover"]["fa_bus_text"]);
  $(".styleMes .cover .fa_subway_text").text(json["cover"]["fa_subway_text"]);

  //音乐
  $("#audio").attr("src",json["music"]);




  //最后一屏 的我也要制作 二维码
  $(".iMake").click(function(e) {
      $(".iMakeImg").show();
      e.stopPropagation();
  });

  $(".imgs").click(function(e) {
      e.stopPropagation();
  });

  $(".iMakeImg").click(function() {
      $(".iMakeImg").hide();
  });

  //5s后loading消失
  $(".loader").on("touchstart" ,function (e){
      e.stopPropagation();
  });
  timerOutLoading = setTimeout(function() {
    $('body').addClass('complete');
    $('.loader').hide();
    cti(0);
  }, 1000);
  
  $('#container').fullpage({
      verticalCentered: false,
      controlArrows: false,
      scrollingSpeed: 300,
      onLeave: function(index, nextIndex, direction) {
          $('.section').eq(index - 1).find('.ani').css('-webkit-animation', 'none');
          cti(nextIndex - 1);

          // 最后一屏隐藏箭头
          if(nextIndex  == $('#container .section ').length){
              $(".fanye").hide();
          }

          // 非最后一屏 显示箭头
          if(index == $('#container .section ').length){
              $(".fanye").show();
          }
      }
  });

  //切割DQL 属性组合动画
  function cti(index) {
      var ani = $('.section').eq(index).find('.ani');
      var timeArr = [];
      for(var i = 0; i < ani.length; i++) {
        var arr = ani.eq(i).attr('DQL').split(' ')
        var aniName = arr[0];
        var aniTime = arr[1];
        var aniFunction = arr[2];
        var aniDelay = arr[3];
        var aniCount = arr[4]
        var aniDirection = arr[5]
        var aniFillMode = arr[6]

        $('.section').eq(index).find('.ani').eq(i).css('-webkit-animation', aniName + ' ' + aniTime + ' ' + aniFunction + ' ' + aniDelay + ' ' + aniCount + ' ' + aniDirection + ' ' + aniFillMode);
        timeArr.push(parseInt(aniDelay) + parseInt(aniTime));
      }
  }



  //需要组合的 js， 组合后 删除 
  function start_1(data){
    $(".start_1 .time").html(data["time"]);
    $(".start_1 .xinlang").html(data["xinlang"]);
    $(".start_1 .xinniang").html(data["xinniang"]);
  }
  function page_1(data){
    $(".page_1 .xinlang").html(data["xinlang"]);
    $(".page_1 .xinniang").html(data["xinniang"]);
    $(".page_1 .time").html(data["time"]);
    $(".page_1 .nong").html(data["nong"]);
    $(".page_1 .place").html(data["place"]);
  }
  function page_2(data){
    $(".page_2 .pic1").attr("src" , data["pic1"]);
    $(".page_2 .pic2").attr("src" , data["pic2"]);
    $(".page_2 .pic3").attr("src" , data["pic3"]);
  }
  function page_3(data){
    $(".page_3 .pic").attr("src" ,data["pic"]);
  }
  function page_4(data){
    $(".page_4 .pic").attr("src" , data["pic"]);
  }
  function page_5(data){
    $(".page_5 .pic1").attr("src", data["pic1"]);
    $(".page_5 .pic2").attr("src", data["pic2"]);
  }
  function page_6(data){
    $(".page_6 .word").html(data["text"]);
    $(".page_6 .pic1").attr("src" , data["pic1"]);
  }
  function page_7(data){
    $(".page_7 .pics").attr("src" , data["pics"]);
  }
  function page_8(data){
    $(".page_8 .pic1").attr("src" ,data["pic1"]);
    $(".page_8 .pic2").attr("src" , data["pic2"]);
  }
  function page_9(data){
    $(".page_9 .pic1").attr("src" , data["address_pic1"]);
    $(".page_9 .gui").attr("src" , data["address_text1"]);
    $(".page_9 .boy_Mobile").attr("href" , data["boy_Mobile"]);
    $(".page_9 .girl_Mobile").attr("href" , data["girl_Mobile"]);
  }
  function end_1(data){
    $(".end_1 .heart").html(data["text"]);
    $(".end_1 .time").html(data["time"]);
    $(".end_1 .address").html(data["address"]);
  }
})