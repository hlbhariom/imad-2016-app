console.log('Loaded!');
//counter code
var counter=0;

var button=document.getElementById('counter');
button.onclick=function () {
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
};
    //create a response
   
               