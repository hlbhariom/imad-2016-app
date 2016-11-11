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
//submit name

var submit=document.getElementById('login_btn');
submit.onclick=function() {
     //create a response
   var request=new XMLHttpRequest();
   //capture the response
   request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
                //capture response
   console.log('user logged in');
   alert('logged in successfully');
               
           }else if (request.status===403){
               alert('username/password is correct');
           }else if (request.status===500){
               alert('something went wrong');
           
           }
           
       }
   };
   //Make a request
   var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username);
console.log(password);
   request.open('POST','http://divya063.imad.hasura-app.io/login',true);
   request.send(JSON.stringify({username: username,password: password}));
    
   
    
};
               