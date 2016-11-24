$(document).click(function(e) {
    if (!$(e.target).is('#navheader a')) {
        $('#navheader .collapse').collapse('hide');
    }
});
$(document).ajaxStart(function(){
  $('div#loading-box.modal').css('z-index','10000').show();
});
$(document).ajaxComplete(function(){
  $('div#loading-box.modal').hide();

});
$(document).ajaxSuccess(function(){


});



$(document).ready(function(){
  $("#blogs div#latest>div.panel-body").load('/blogs/latest',function(res,stat,xhr){
    if(xhr.status==200){
      init();
    }
    else{
      $(this).html(`<div class="alert alert-danger"><strong>`+xhr.status+`</strong> `+response+`</div>`);
    }
  });
  $('a[data-parent="#accordion"]').click(function(){
    target=$(this).attr("href").slice(1);
    target=encodeURI(target);
    $("#blogs div>div.panel-body *").remove();
    $("#blogs div#"+target+">div.panel-body").load('/blogs/'+target,function( response, status, xhr ){//Loads article list in accordion
      if ( status == "error" ){
        $(this).html(`<div class="alert alert-danger"><strong>`+xhr.status+`</strong> `+response+`</div>`);
      }
      if(xhr.status==200){
        init();
      }
    });
});

  var pgwSlide=$('.pgwSlideshow').pgwSlideshow();
  $(window).resize(function(){
    pgwSlide.reload({
      maxHeight:530
    });
  })
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

//Init js for article list
function init(){

  $('#blogs .list-group-item h4.list-group-item-heading').click(function(){
  target=$(this).parents('a').attr("href").slice(1);
  target=encodeURI(target);

  $('#articleModal div.modal-body').load(target,function(response,status,xhr){
    $('iframe').addClass('embed-responsive-item').css('display','initial');
    $('iframe').parent().addClass('embed-responsive embed-responsive-16by9');
    $('#comment-submit').click(function(){
      var comment=$('#comment').val();
      var cnt=Number($('span.badge.black').html())+1;
      var article_hash=$(this).attr('article_hash');
        $.ajax({
          type:'POST',
          url:'/post/comment/'+$(this).attr('article_url'),
          data:JSON.stringify({"comment":comment}),
          contentType:"application/json",
          success: function(data,msg)
                    { var commentObj=JSON.parse(data);
                      $('span.badge.black').html(cnt);
                      var commentElement=`<div class="col-sm-12">
                        <h4 class="text-success">${commentObj.username} <small>${commentObj.date}</small></h4>
                        <div class="col-md-12">
                          <p>${commentObj.comment}</p>
                        </div>
                        <br>
                      </div>
                  `;
                  $('span.badge.black').val(cnt+1);
                  $('#articleModal div.row').append(commentElement);
                  },
          error: function(err)
            { console.log(err.responseText);
              if(err.status==401){
                $('a[href="#signin"][data-target="#loginModal"]').trigger('click');
              }
          }
        });
    });
  });
  });
}

//Post article
$('#article-submit').click(function(){
  var title=$('#article-title').val();
  var category=$('#article-category').val();
  var tags=$('#article-tags').val();
  var content=$('#article-content').val();
  $('#article-title').val('');
  $('#article-tags').val('');
  $('#article-content').val('');
  $('#article-category').val('Select Category');
    $.ajax({
      type:'POST',
      url:'/post/article',
      data:JSON.stringify({"title":title,"category":category,"tags":tags,"content":content}),
      contentType:"application/json",
      success: function(data,msg)
                { alert(data) },
      error: function(err)
        { console.log(err.responseText)}
    });
});
//SignUp
$('#signup button[type="submit"]').click(function(){
  var username=$('#signup input[name="username"]').val();
  var email=$('#signup input[name="email"]').val();
  var password=$('#signup input[name="password"]').val();

    $.ajax({
      type:'POST',
      url:'/register',
      data:JSON.stringify({"username":username,"email":email,"password":password}),
      contentType:"application/json",
      success: function(data,msg)
                { alert(data);
                },

      error: function(err)
        { alert(err.responseText)}
    });
});
//Signin
$('#signin button[type="submit"]').click(function(){
  var username=$('#signin input[name="username"]').val();
  var password=$('#signin input[name="password"]').val();

    $.ajax({
      type:'POST',
      url:'/login',
      data:JSON.stringify({"username":username,"password":password}),
      contentType:"application/json",
      success: function(data,msg)
                { alert(data);
                  init_login();
                  $('#loginModal').modal('hide');
                },
      error: function(err)
        { alert(err.responseText)}
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
//Feedback
$('#feedback-submit[type="submit"]').click(function(){
  var name=$('#feedback-name').val();
  var email=$('#feedback-email').val();
  var comment=$('#feedback-comment').val();

    $.ajax({
      type:'POST',
      url:'/post/feedback',
      data:JSON.stringify({"name":name,"email":email,"comment":comment}),
      contentType:"application/json",
      success: function(data,msg)
                { alert(data);
                },

      error: function(err)
        { alert(err.responseText)}
    });
});

var username;
var signup=`<li><a href="#signup" data-toggle="modal" data-target="#loginModal"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>`;
var signin=`<li><a href="#signin" data-toggle="modal" data-target="#loginModal"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`;
var signout=`<li><a href="#signout"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>`;
function loggedinButtons(){
  $('ul#accountBar').append(signout);
  if(username=='admin'){
    $('#myNavbar a[href="#compose"]').parent().show();
    $('#compose').show();
  }
  $('body').css('padding-right','0');
  $('a[href="#signout"]').click(function(){
    $.get('/logout',function(data,status){
      alert(data);
      init_login();
    });

  });
  $('ul#accountBar a[href="#signin"]').parent().remove();
  $('ul#accountBar a[href="#signup"]').parent().remove();
}
function loggedoutButtons(){
  $('ul#accountBar').append(signup);
  $('ul#accountBar').append(signin);
  $('#navheader a').click(function(){
    $('.modal,div.modal-backdrop').hide();
    $('a.other[href="'+$(this).attr('href')+'"]').trigger('click');
  });
  $('#myNavbar a[href="#compose"]').parent().hide();
  $('#compose').hide();
  $('ul#accountBar a[href="#signout"]').parent().remove();
}
function init_login(){
        // Create a request object
        var request = new XMLHttpRequest();
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200 || request.status === 304) {
                if(this.responseText.slice(13)=='admin'){
                  $('#myNavbar a[href="#compose"]').parent().show();
                  $('#compose').show();
                }
                else{
                  $('#myNavbar a[href="#compose"]').parent().hide();
                  $('#compose').hide();
                }
                  loggedinButtons();
              } else {
                  loggedoutButtons();
              }
          }
        };
        request.open('GET', '/check-login', true);
        request.send(null);
}

init_login();

