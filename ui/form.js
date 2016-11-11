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

$('a[link_id]').click(function(){
  $('.modal').show();
  $('a[href="#'+$(this).attr('link_id')+'"]').trigger('click');
});

var modal = document.getElementById('register');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
