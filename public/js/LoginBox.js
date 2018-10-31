$(document).ready(function () {

  $('.login-box').click(function (event) {
    event.stopPropagation();
  });

  $('.login-link').click(function (event) {
    event.stopPropagation();
    $('.login-box').fadeToggle(200);
  });

  $(document).click(function () {
    $('.login-box').fadeOut(200);
  });
});