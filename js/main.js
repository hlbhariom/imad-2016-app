var loadingref='<pre>   <span id="loadingref" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="text-decoration:none;"></span></pre>';
var loadingrep='<pre>   <span id="loadingrep" class="glyphicon glyphicon-repeat glyphicon-refresh-animate" style="text-decoration:none;"></span></pre>';

$(document).click(function(e) {
    if (!$(e.target).is('#navheader a')) {
        $('#navheader .collapse').collapse('hide');
    }
});
$(document).ajaxStart(function(e){

});
$(document).ajaxComplete(function(){
  $('input,textarea').val('').trigger('keyup');
  $('#loadingref').remove();
});
function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

$(document).ready(function(){
    $('[type=submit]').click(function(){
        $(this).append(loadingref);
    });
    $('#profile').css('background-image', 'url("/image/cover.jpg")');
    $('#blogs').css('background-image', 'url("/image/blogbg.jpg")');
    $('#contact').css('background-image', 'url("/image/contact.jpg")');
    $('#compose').css('background-image', 'url("/image/compose.jpg")');
    $('#feedback-submit').click(function(){$('#contact input,#contact textarea').val('');})
    $("#blogs div#latest>div.panel-body").load('/blogs/latest',function(res,stat,xhr){
    if(xhr.status==200){
      init();
    }
    else{
      $(this).html(`<div class="alert alert-danger"><strong>`+res+'</strong> </div>');
    }
  });
  $('a[data-parent="#accordion"]').click(function(){

    target=$(this).attr("href");
    if(!($(target+'.in').length)){
    $(this).append(loadingrep);
    target=encodeURIComponent(target.slice(1));

    $("#blogs div>div.panel-body *").remove();
    $("#blogs div#"+target+">div.panel-body").load('/blogs/'+target,function( response, status, xhr ){//Loads article list in accordion
      if ( status == "error" ){
        $(this).html(`<div class="alert alert-danger"><strong>`+response+`</strong> </div>`);
      }
      if(xhr.status==200){
        init();

      }
      $('#loadingrep').remove();
    });
  }
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
  var title=target.split('/')[3];
  var category=target.split('/')[2];
  target=encodeURI(target);
  var article_url=category+'/'+title;

  $.ajax({
    url:target,
    type:'GET',
    success:function(response,status){
            $('#articleModal div.modal-body').html(articleTemplate(JSON.parse(response)));
            getComments(title+category);
            $('iframe').addClass('embed-responsive-item').css('display','initial');
            $('iframe').parent().addClass('embed-responsive embed-responsive-16by9');
            $('#comment-submit').click(function(){
            var comment=escapeHTML($('#comment').val());
              $.ajax({
                type:'POST',
                url:'/post/comment/'+article_url,
                data:JSON.stringify({"comment":comment}),
                contentType:"application/json",
                success: function(data,msg)
                          {
                            console.log('Title:'+title+' Category:'+category);
                            getComments(title+category);
                        },
                error: function(err)
                  { console.log(err.responseText);
                    if(err.status==401){
                      $('a[href="#signin"][data-target="#loginModal"]').trigger('click');
                    }
                }
              });
            });
      }
  });
});
}

//Get comment
function commentModel(commentData){
  var allcomments="";
  for(i=0;i<commentData.length;i++){
    var time = new Date(commentData[i].date);
    var username=commentData[i].username;
    allcomments+=`<div class="col-sm-12">
      <h4 class="text-success">${escapeHTML(username)} <small>${time.toLocaleTimeString()} on ${time.toLocaleDateString()}</small></h4>
      <div class="col-md-12">
        <p>${escapeHTML(commentData[i].comment)}</p>
      </div>
      <br>
    </div>
`;
  }
  var comment=`<p><span class="badge black">${escape(commentData.length)}</span> Comments:</p><br>
  <div class="row">
    ${allcomments}
  </div>`;
  return comment;
}

function getComments (currentArticleTitle) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      var comments = document.getElementById('comments');
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                content =commentModel(commentsData);
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
                console.log(this.responseText);
            }
        }
    };

    request.open('GET', '/getComments/' + currentArticleTitle, true);
    request.send();

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
      data:JSON.stringify({"title":title,"category": category,"tags": tags,"content": content}),
      contentType:"application/json",
      success: function(data,msg)
                { alert(data) },
      error: function(err)
        { console.log(err.responseText)}
    });
});
//SignUp
$('#signup button[type="submit"]').click(function(){
  var username=escapeHTML($('#signup input[name="username"]').val());
  var email=$('#signup input[name="email"]').val();
  var password=$('#signup input[name="password"]').val();

    $.ajax({
      type:'POST',
      url:'/register',
      data:JSON.stringify({"username": username,"email":email,"password":password}),
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
      data:JSON.stringify({"username": username,"password":password}),
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
  var name=escapeHTML($('#feedback-name').val());
  var email=escapeHTML($('#feedback-email').val());
  var comment=escapeHTML($('#feedback-comment').val());

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
function article(articleData,tagData){
  var alltag="";
  for(i=0;i<tagData.rows.length;i++){
    alltag+="<span class='label label-success' style='margin-left:3px;'>"+tagData.rows[i].tag+"</span>";
  }
  var article=`
  <h2>${articleData.title}</h2>
  <h5><span class="glyphicon glyphicon-time"></span> ${new Date(articleData.date)}</h5>
  <h5>${alltag}</h5><br>
    ${articleData.content}
  <hr>`;
  return article;
}
function articleTemplate(data){
  console.log(data);
  var articleData=data.article,tagData=data.tags;
  var commentBox=`<h4>Leave a Comment:</h4>
  <form role="form" action="javascript:void(0);">
    <div class="form-group">
      <textarea id="comment" placeholder="What are your views?" class="form-control" rows="3" required></textarea>
    </div>
    <button type="submit" id="comment-submit" article_url='${articleData.category}/${encodeURIComponent(articleData.title)}' class="btn btn-success">Submit</button>
  </form>
  <br><br>`;
  var comments='<div id="comments" class="container"></div>';
  return article(articleData,tagData)+commentBox+comments;
}


function loadAdmin(){
    $('#compose').show();
    $('#myNavbar a[href="#compose"]').parent().show();
}
function unloadAdmin(){
  $('#compose').hide();
  $('#myNavbar a[href="#compose"]').parent().hide();
}
function loggedinUser(username){
  console.log(username);
  $('a.navbar-brand').html('Welcome '+username+'!');
  if(username==="admin") loadAdmin();
  else unloadAdmin();
  var signout=`<li><a href="#signout"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>`;

  $('ul#accountBar').html(signout);
  $('body').css('padding-right','0');
  $('a[href="#signout"]').click(function(){
    $.get('/logout',function(data,status){
      alert(data);
      location.reload();
      init_login();
    });
  });
  $('ul#accountBar a[href="#signin"]').parent().remove();
  $('ul#accountBar a[href="#signup"]').parent().remove();
}

function loggedoutUser(){
  var signup=`<li><a href="#signup" data-toggle="modal" data-target="#loginModal"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>`;
  var signin=`<li><a href="#signin" data-toggle="modal" data-target="#loginModal"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`;
   $('a.navbar-brand').html('Blog Pedia');
  $('ul#accountBar').html(signup+signin);
  //$('ul#accountBar').append(signin);
  $('#navheader a').click(function(){
    $('.modal,div.modal-backdrop').hide();
    $('a.other[href="'+$(this).attr('href')+'"]').trigger('click');
  });
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
                  loggedinUser(this.responseText.slice(13));
              } else {
                  loggedoutUser();
              }
          }
        };
        request.open('GET', '/check-login', true);
        request.send();
}

init_login();
