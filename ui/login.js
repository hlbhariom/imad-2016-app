
$('#loginlink').click(function(){
  $('.acc-tab').hide();
  $('#login.acc-tab').show().slideUp(500).slideDown();
});

$('#registerlink').click(function(){
  $('.acc-tab').hide();
  $('.acc-tab').removeClass('loading');
  $('#register.acc-tab').show().slideUp(500).slideDown(500);
});

/*$('#aboutuslink').click(function(){
  $('.login').show().slideUp(2000).slideDown(2000);
});

$('#loginlink').click(function(){
  $('.login').show().slideUp(2000).slideDown(2000);
});*/
$('.acc-tab').on('focus', function() {
  $('.acc-tab').addClass('focused');
  $('.acc-tab-header').css('position','fixed');
});

$('.acc-tab').on('submit', function(e) {
  e.preventDefault();
  $('.acc-tab-header').css('position','absolute');
  $('.acc-tab').removeClass('focused').addClass('loading');
});
