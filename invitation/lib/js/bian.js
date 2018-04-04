$("#playbox").on("click" ,mp3_play);

$('.bian .style').on('touchstart', function(e) {
  e.preventDefault();
  e.stopPropagation();
  $('.styleMes').show();
});
$('.styleMes .back').on('touchstart', function(e) {
  e.preventDefault();
  e.stopPropagation();
  $('.styleMes').hide();
});


// 音乐图标
var flag = true;

function mp3_play() {
  if(flag) {
    $('#playbox audio').get(0).pause();
    $('#playbox img').removeClass('on');
  } else {
    $('#playbox audio').get(0).play();
    $('#playbox img').addClass('on');
  }
  flag = !flag;
}

$().ready(function() {

    $(document).one('touchstart', function(e) {
      var music = document.getElementById("audio");
      if(music.paused) {
        music.play();
      }
    });
    document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
      document.getElementById("audio").play();
    });
  
});
