console.log('Loaded!');
//counter code
var counter=0;
var button=getElementById('counter');
button.onclick=function () {
    //make a response
    //caputre a response
    //render a request
    counter=counter+1;
    var span=getElementById('count');
    span.innerHTML=counter.toString();
    
};