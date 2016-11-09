console.log('Loaded!');
//counter code

var button=getElementById('counter');
button.onclick=function () {
    //create a response
    var request = new XMLHttpRequest();
    //caputre a response
    request.onreadystatechange=function() {
        if(request.readystatechange===XMLHttpRequest.Done){
            if(request.status===200){
                var counter=request.responseText;
                var span=getElementById('count');
    span.innerHTML=counter.toString();
            }
        }
            
    };
   //make the request
   request.open('GET' 'http://divya063.imad.hasura-app.io/counter', true);
   request.send(null);
   
    
    
};