function openTab(tabId,par) {
    var i, tabcontent, tablinks;
    var xhttp = new XMLHttpRequest();
    $('.mask').show();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(par).innerHTML =this.responseText;
            document.getElementById(par).style.display="block";
        }
    };
    xhttp.open("GET", "/"+tabId, true);
    xhttp.send();
    $('.mask').hide();
}

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

$('document').ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
    });
});


$('document').ready(function(){
  $('.closebtn').click(function(){
      $('#register.overlay').css('height','0%');
  });
  $('#defaultOpen').trigger('click');
  $('#banner i.hvr-icon-down').click(function() {
      $('.overlay').css('height','100%');
      $(this).hide();
        $('#banner i.hvr-icon-up').fadeIn();
        $('#banner i.hvr-icon-up').fadeIn("slow");
        $('#banner i.hvr-icon-up').fadeIn(5000);
  });
  $('#banner i.hvr-icon-up').click(function() {
      $('.overlay').css('height','0%');
      $(this).hide();
      $('#banner i.hvr-icon-down').fadeIn();
      $('#banner i.hvr-icon-down').fadeIn("slow");
      $('#banner i.hvr-icon-down').fadeIn(5000);
  });
/*$.ajaxSetup({beforeSend:$('.mask').show(), complete:$('.mask').hide()});
  $.ajax();
/*$('document').ajaxStart(function(){
  $('.mask').show();
});
$('document').ajaxComplete(function(){
  $('.mask').hide();
});
$(document).bind("ajaxSend", function(){
   $(".mask").show();
 }).bind("ajaxComplete", function(){
   $(".mask").hide();
 });*/
});



$(".overlay").css('height','0%');
$(".modal").hide();

$('#li2').click(function(){
  $('#li2').hide();
  $('#searchbox').show();
});
$('i#searchbtn').click(function(){
  $('#searchbox').hide();
  $('#li2').show();
});

function slshow(){
    if(window.outerWidth<920 && !navigator.appVersion.includes("Chrome")){
      $(".slideshow-container").css("margin-top","45px");
    } else{
      $(".slideshow-container").css("margin-top","0");
    }
}
$('document').on('ready',slshow());
$(window).resize(function(){slshow();})
