$(window).scroll(function() {
  if ($(window).scrollTop() > 200) {
    // console.log($(window).scrollTop());
    document.getElementById("flex-wrapper").classList.add("trs");
    document.getElementById("logo-img").classList.add("transform");
    document.getElementById("top-row-logo").classList.add("trans");
  } else {
    document.getElementById("flex-wrapper").classList.remove("trs");
    document.getElementById("logo-img").classList.remove("transform");
    document.getElementById("top-row-logo").classList.remove("trans");
  }
});
