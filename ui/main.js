//Writes 'Loaded!' in console.
console.log('Loaded!');


//Change text of 'jstest-text' div
var element = document.getElementById('jstest-text');
element.innerHTML='This text has been changed using Javascript.';

//Move image gradually right if clicked.
var img=document.getElementById('img');
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft + 5;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick = function(){
//Move Image Once towards right    img.style.marginLeft='100px';
    var interval=setInterval(moveRight,50);
};

//Javascript must be called after an element Id is already declared. 