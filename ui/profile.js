 var register=document.getElementById('register_btn');
 register.onclick =function() {
    
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          
        }
        
        // Make the request
        var username = document.getElementById('user').value;
        var password = document.getElementById('pass').value;
        console.log(user);
        console.log(pass);
        request.open('POST', 'http://divya063.imad.hasura-app.io/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username:user, password: pass}));  
        }; 
    
    
};

   
               


    