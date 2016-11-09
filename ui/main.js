console.log('Loaded!');
//counter code


var button=document.getElementById('counter');
button.onclick=function () {
    
    //create a response
   var request=new XMLHttpRequest();
   //capture the response
   request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               var counter=request.responseText;
                 var span=document.getElementById('count');
    span.innerHTML=counter.toString();
           }
           
       }
   };
   //Make a request
   request.open('GET','http://divya063.imad.hasura-app.io/counter',true);
   request.send('null');
    
  
};
               