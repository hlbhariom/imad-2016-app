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

var submit=document.getElementById('submit_btn');
submit.onclick=function() {
     //create a response
   var request=new XMLHttpRequest();
   //capture the response
   request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
                //capture response
    var names=request.responseText;
    names=JSON.parse(names);
    var list='';
    for(var i=0;i<names.length;i++){
        list+='<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
    
               
           }
           
       }
   };
   //Make a request
   var nameInput=document.getElementById('nam');
var nam=nameInput.value;
   request.open('GET','http://divya063.imad.hasura-app.io/submit-name?nam='+ nam,true);
   request.send('null');
    
   
    
};
               