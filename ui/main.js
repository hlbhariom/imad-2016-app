//Writes 'Loaded!' in console.
console.log('Loaded!');


//Change text of 'jstest-text' div
var element = document.getElementById('jstest-text');
element.innerHTML='This text has been changed using Javascript.';

//Move Image
var img=document.getElementById('img');
img.onclick = function(){
    img.style.marginLeft='100px';
};
