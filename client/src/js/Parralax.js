$(window).scroll(function() {
  parralax();
});

function parralax() {
  var wScroll = $(window).scrollTop();
  var speed = 0.33;
  var total = wScroll * speed;
  $(".parralax-bg").css("background-position-y", "calc(14% + " + total + "px)");
}
