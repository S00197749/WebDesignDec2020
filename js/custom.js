  $(document).ready(function(){
      
    // set the checkout figure
    if (localStorage.getItem('checkout') == null) {  
        localStorage.setItem('checkout',0);
    }
    $("#checkout" ).html(localStorage.getItem('checkout'));

    // check if user is logged in or logged out..
    var loggedin=localStorage.getItem('loggedIn'); 

    if (loggedin==1) {
        // change the text from Login to Logout
        $("#loginlogout" ).html("Logout" );
        // show User details nav item by removing bootstrap d-none which hides the nav item
        $( "#accountdetails" ).removeClass( "d-none" );            
    } else{
        // use addClass to hide the display of User Details
        $( "#accountdetails" ).addClass( "d-none" );
        // change the text from Logout to Login
        $( "#loginlogout" ).html("Login" );
        // set the href propery to point to login.html if user clicks on it
        $("#loginlogout" ).prop("href", "login.html");
    } 

    // wait for loginlogout button to be clicked - a click here means the user has chosen to logout
    $("#loginlogout").button().click(function(){
        if (loggedin==1) {
            // set the flag so that user is not logged in
            localStorage.setItem('loggedIn',0);
            window.location.href = "index.html";
        }  else 
            window.location.href = "login.html";

    });       

        
    if (localStorage.getItem('logindetails') === null) {  
        var loginDetails = {username:"tdurden@email.com", password:"fightclub"};
        localStorage.setItem('logindetails',JSON.stringify(loginDetails));
    } else {
        loginDetails=JSON.parse(localStorage.getItem('logindetails'));
    }
    // Verify login info when submit is clicked
    $('form[name="login"]' ).submit(function( event ) {
        var email=$('input[name="email"]').val();
        var password =$('input[name="password"]').val();
        if (email==loginDetails.username && password==loginDetails.password)  {   
            // successful login, user redirected to shop.html
            localStorage.setItem('loggedIn',1);    
            window.location.href = "index.html";
        }
        else {
            // login unsuccessful, error message appears
            localStorage.setItem('loggedIn',0);
            $( "#loginerror" ).addClass( "d-block" );
        }
        return false;
    });
    $('form[name="resetPassword"]' ).submit(function( event ) {
        loginDetails.password=$('input[name="password"]').val();       
        localStorage.setItem('logindetails',JSON.stringify(loginDetails));
        window.location.href = "login.html";
        return false;
    }); 
    $('form[name="register"]' ).submit(function( event ) {
        loginDetails.username=$('input[name="email"]').val();
        loginDetails.password=$('input[name="password"]').val();       
        localStorage.setItem('logindetails',JSON.stringify(loginDetails));
        window.location.href = "login.html";
        return false;
    }); 


    // this code is run everytime this js file is loaded.   
    if (localStorage.getItem('userdetails') === null) {  
        // if userdetails is null, that means it has not been loaded before. we not initialise userdetails object
        var userDetails = {firstName:"Tyler", lastName:"Durden", dob:"1999-10-15",address1:"Wilmington", address2:"Delaware", eircode:"F42 GR57"};
        // now we store the userdetails object as a localstorage object but localstore only stores text and userdetails is a javascript object
        // we convert a javascript object ot a string using JSON.stringify - we are being expedient!
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
    } else {
        // if localstorage variable userdetails is already created - load it to javascript oject. JSON.parse turns it back into an javascript object
        userDetails=JSON.parse(localStorage.getItem('userdetails'));
    }
      
    if (localStorage.getItem('productorder') === null) {  
        var productOrder = {size:"small", quantity:"0"};
        localStorage.setItem('productorder',JSON.stringify(productOrder));
    } else {
        productOrder=JSON.parse(localStorage.getItem('productorder'));
    }

    // we only run this code if an id of udetails is on the html page we are currently on - makes the code a little bit more efficient
    // if the length > 0 it means we are on the right page - and we can populdate the form fields!!!
    if ($('#udetails').length > 0) {
        if(loggedin == 1){
            $('input[name="firstname"]').val(userDetails.firstName);         
            $('input[name="lastname"]').val(userDetails.lastName);
            $('input[name="dob"]').val(userDetails.dob);
            $('input[name="address1"]').val(userDetails.address1);
            $('input[name="address2"]').val(userDetails.address2);
            $('input[name="eircode"]').val(userDetails.eircode);
        }
        else{
            $("#buy-button" ).addClass("d-none");
            $( "#no-login" ).addClass( "d-block" );
            $('input[name="cardname"]').val("");
            $('input[name="cardnumber"]').val("");            
        }
        
    }
      
    // wait for submit button to be clicked on userdetails update form
    $('form[name="userdetails"]' ).submit(function( event ) {
        // if the user updates the user details - we update the userDetails javascript object
        userDetails.firstName=$('input[name="firstname"]').val();
        userDetails.lastName=$('input[name="lastname"]').val();
        userDetails.address1=$('input[name="address1"]').val(); 
        userDetails.address2=$('input[name="address2"]').val();   
        userDetails.eircode=$('input[name="eircode"]').val();         
        // finally we convert the javascript object to a string with JSON.stringify and save it to localstorage
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
        return false;
    }); 

    // wait for submit button to be clicked on userdetails update form
    $('form[name="paymentdetails"]' ).submit(function( event ) {
        var cardnumber=$('input[name="cardnumber"]').val();
        var cvc=$('input[name="cvc"]').val();
        if (cardnumber=="1234 5678 9102 3456") {
            if(cvc=="135"){
                $( "#payment-failure" ).addClass( "d-none" );
            $( "#payment-success" ).removeClass( "d-none" );
            $( "#buy-button" ).addClass( "d-none" );
            var total=0;
            localStorage.setItem('checkout',total); // makes sure that when we goto another page - the total help in localstorage is zero
            $( "#checkout" ).html(total);
            //reset basketTotal
            var price=0;
            localStorage.setItem('basketTotal',price);
            $( "#basketTotal" ).html("€" + price);
            //reset numberOfOrders   
            var orders=0;
            localStorage.setItem('numberOfOrders', orders);
            $( "#numberItems" ).html("Total Items Ordered: " + orders);
            //reset cards    
            $("#order1").addClass("d-none");
            }
            else {
            $( "#payment-failure" ).removeClass( "d-none" );
            }
            
        } else {
            $( "#payment-failure" ).removeClass( "d-none" );
        }
        return false;
    });
    
                                //start of my own code    
    if (localStorage.getItem('basketorders') === null) {  
        var basketOrders = [0, 0, 0, 0, 0, 0];
        localStorage.setItem('basketorders',JSON.stringify(basketOrders));
    } else {
        basketOrders=JSON.parse(localStorage.getItem('basketorders'));
    }
      
    if (localStorage.getItem('basketTotal') == null) {  
        localStorage.setItem('basketTotal',0);       
    }  
    $("#basketTotal" ).html("€" + localStorage.getItem('basketTotal'));
      
    if (localStorage.getItem('numberOfOrders') == null) {  
        localStorage.setItem('numberOfOrders',0); 
    }
    $("#numberItems" ).html("Total Items Ordered: " + localStorage.getItem('numberOfOrders'));     
      
    $('form[name="productOrder"]' ).submit(function( event ) {
            var size = $('#size').val();
            var quantity = $('#quantity').val();
        
            if ($('#product1').length > 0) {
                var product1 = {name:"LFC Jersey", price:100*quantity, size:size, quantity:quantity};
                var basketTotal = parseInt(localStorage.getItem('basketTotal'));
                basketTotal += product1.price;               
                localStorage.setItem('basketTotal', basketTotal);
                $("#basketTotal" ).html("€" + basketTotal);
                basketOrders[0] += product1.quantity;
                console.log(basketOrders[0]);
                localStorage.setItem('basketorders',JSON.stringify(basketOrders));
                if(basketOrders[0] != 0){
                    $("order1").addClass("d-block");
                }

            }
            else if ($('#product2').length > 0) {
                var product2 = {name:"ManUtd Jersey", price:110*quantity, size:size, quantity:quantity};
                var basketTotal = parseInt(localStorage.getItem('basketTotal'));
                basketTotal += product2.price;
                localStorage.setItem('basketTotal', basketTotal);
                $("#basketTotal" ).html("€" + basketTotal);
            }
            else if ($('#product3').length > 0) {
                var product3 = {name:"Boxing Bag", price:90*quantity, quantity:quantity};
                var basketTotal = parseInt(localStorage.getItem('basketTotal'));
                basketTotal += product3.price;
                localStorage.setItem('basketTotal', basketTotal);
                $("#basketTotal" ).html("€" + basketTotal);
            }
            else if ($('#product4').length > 0) {
                var product4 = {name:"Boxing Gloves", price:50*quantity, size:size, quantity:quantity};
                var basketTotal = parseInt(localStorage.getItem('basketTotal'));
                basketTotal += product4.price;
                localStorage.setItem('basketTotal', basketTotal);
                $("#basketTotal" ).html("€" + basketTotal);
            }
            else if ($('#product5').length > 0) {
                var product5 = {name:"Darts Board", price:75*quantity, quantity:quantity};
                var basketTotal = parseInt(localStorage.getItem('basketTotal'));
                basketTotal += product5.price;
                localStorage.setItem('basketTotal', basketTotal);
                $("#basketTotal" ).html("€" + basketTotal);
            }
            else if ($('#product6').length > 0) {
                var product6 = {name:"Darts Set", price:30*quantity, quantity:quantity};
                var basketTotal = parseInt(localStorage.getItem('basketTotal'));
                basketTotal += product6.price;
                localStorage.setItem('basketTotal', basketTotal);
                $("#basketTotal" ).html("€" + basketTotal);
            }
        
            var total=parseInt(localStorage.getItem('checkout'));
            total += parseInt(quantity);
            localStorage.setItem('checkout',total);
            $("#checkout" ).html(total );
            
            var numberOfItems = parseInt(localStorage.getItem('numberOfOrders'));
            numberOfItems += parseInt(quantity);
            localStorage.setItem('numberOfOrders', numberOfItems);
            $( "#numberItems" ).html("Items Ordered: " + numberOfItems);

    });
     
         //contact page
    if (localStorage.getItem('contactdetails') === null) {  
        var contactDetails = {firstName:"", lastName:"", email:"", gender:"", message:""};
        localStorage.setItem('contactdetails',JSON.stringify(contactDetails));
    } else {
        contactDetails=JSON.parse(localStorage.getItem('contactdetails'));
    }
    $('form[name="contact"]' ).submit(function( event ) {
        contactDetails.firstName=$('input[name="firstname"]').val();
        contactDetails.lastName=$('input[name="lastname"]').val();
        contactDetails.email=$('input[name="email"]').val();
        contactDetails.gender=$('input[name="gender"]').val(); 
        contactDetails.message=$('input[name="message"]').val(); 
        
        localStorage.setItem('contactdetails',JSON.stringify(contactDetails));
        $("#contact-success").addClass("d-block");
        return false;
    }); 
                                //end of my own code        
}); 