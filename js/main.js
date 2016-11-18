$(document).click(function(e) {
    if (!$(e.target).is('#navheader a')) {
        $('#navheader .collapse').collapse('hide');
    }
});
$(document).ajaxStart(function(){
  $('div#loading-box.modal').show();
});
$(document).ajaxComplete(function(){
  $('div#loading-box.modal').hide();
});
$(document).ready(function(){
  $('#blogs a[data-toggle]').click(function(){
    target=$(this).attr("href")
    $("#blogs div"+target+">div.panel-body").load('/blogs/latest');
  });
  var pgwSlide=$('.pgwSlideshow').pgwSlideshow();
  $(window).resize(function(){
    pgwSlide.reload({
      maxHeight:530
    });
  })
  $('a[data-toggle="popover"]').popover();
  // Add scrollspy to <body>
  $('body').scrollspy({target: ".navbar", offset: 50});
  // Add smooth scrolling on all links inside the navbar
  $("#myNavbar a").on('click', function(event) {
    $(this).trigger('focus');
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  });

});
window.onscroll=function(){
  if(this.scrollY>=document.getElementById('landing').scrollHeight-50){
    $('#navheader').css('background','rgba(0,0,0,0.9)');
    $('a.navbar-brand').css({
      'font-family': 'mospace',
      'color': 'aliceblue'
    });
  }
  else{
    $('#navheader').css('background','transparent');
    $('a.navbar-brand').css({'background':'transparent'});
  }
}

$(window).scroll(function() {
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;
    var winTop = $(window).scrollTop();
      if (pos < winTop + 588) {
        $(this).addClass("slide");
      }
  });

});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
//turn to inline mode
$.fn.editable.defaults.mode = 'inline';
$('#occupation').editable({
    type: 'text',
    pk: 1,
    url: '/post',
    title: 'Enter Occupation'
});
$('#workplace').editable({
    type: 'text',
    pk: 2,
    url: '/post',
    title: 'Where do you work?'
});


/*Form.js starts here*/
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
var $this = $(this), label = $this.prev('label');
if (e.type === 'keyup') {
    if ($this.val() === '') {
        label.removeClass('active highlight');
    } else {
        label.addClass('active highlight');
    }
} else if (e.type === 'blur') {
    if ($this.val() === '') {
        label.removeClass('active highlight');
    } else {
        label.removeClass('highlight');
    }
} else if (e.type === 'focus') {
    if ($this.val() === '') {
        label.removeClass('highlight');
    } else if ($this.val() !== '') {
        label.addClass('highlight');
    }
}
});
$('.tabs a.other').on('click', function (e) {
e.preventDefault();
$(this).parent().addClass('active');
$(this).parent().siblings().removeClass('active');
target = $(this).attr('href');
$('.tab-content > div').not(target).hide();
$(target).fadeIn(600);
});

$('#navheader a').click(function(){
  $('a.other[href="'+$(this).attr('href')+'"]').trigger('click');
});

var modal_reg = document.getElementById('register');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal_reg) {
        modal_reg.style.display = "none";

    }
}

/*Form.js ends here*/
