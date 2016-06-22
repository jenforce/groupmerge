
$( document ).ready(function() {
    console.log( "ready!" );

						 var dataRef = new Firebase("https://planyourdaytrip.firebaseio.com/");

						//button click 
						$("#addUser").on("click", function() {

						   var name = $('#nameinput').val();
						   var email = $('#emailinput').val();
						   //call get location
						   getLocation();


						   $('.displays').html('Hi&nbsp;'+ name);
						   /*//call eventbrite function
						   googleApiSuccessHandlerEventbrite();*/
						   

						   dataRef.push({
						      name: name,
						      email:email,
						      
						    });
						  return false;
						});

						dataRef.on("child_added", function(snapshot) {

						        console.log(snapshot);
						    
						        console.log(snapshot.val().name);
						        console.log(snapshot.val().email);
						       
						         /*$('#namedisplay').html(snapshot.val().name);
						         $('#emaildisplay').html(snapshot.val().email);*/
						         
						  }, function (errorObject) {

						      console.log("The read failed: " + errorObject.code);

						  });
						//geolocation functions 
						function showLocation(position) {
						            var latitude = position.coords.latitude;
						            var longitude = position.coords.longitude;
						            console.log("Latitude : " + latitude + " Longitude: " + longitude);
						            //eventbrite use latitude and longitude
						            googleApiSuccessHandlerEventbrite = function () {
						                var eventBriteUrl = "https://www.eventbriteapi.com/v3/";
						                var token = "OO4THRQ4RMB522E4DLLG";
						                $.ajax({
						                  type: "GET",
						                  url: eventBriteUrl + "events/search/?location.within=100km&location.latitude="+latitude+"&location.longitude="+longitude+"&token="+token,
						      //------dataType solve console errer: Node cannot be inserted at the specified point in the hierarchy
						                 dataType:'html',
						                  success: function(response){
						                   // console.log('response', response);
						      //-----------for loop the event result out------
						                    var result = response.events;
						                    for (var i=0; i<6; i++){
						                      console.log(result[i]);
						                      var eventDiv = $('div');
						                      var eventIntro = $('<p>');
						                      eventIntro.text('Event Descriptio:&nbsp;'+result[i].description.html);
						                      var eventImg = $('<img>');
						                      eventImg.attr('src', result[i].logo.url)
						                      eventDiv.append(eventImg);
						                      eventDiv.append(eventIntro);
						                      $('#events').append(eventDiv);
						                    }
						      // -------Loop ends ----------

						                  }
						                  
						                });
						              };
						      // -----eventbrite function ends-----
						      // -----Call eventfunction insdie showlocation function
						          googleApiSuccessHandlerEventbrite();

						                 //test funciton
						                  function inner() {
						                      alert("hi");
						                  }
						                  inner(); // call it
						                //test call function inside another funciton
						                  //eventbrite code ends
						         }

						         function errorHandler(err) {
						            if(err.code == 1) {
						               alert("Error: Access is denied!");
						            }
						            
						            else if( err.code == 2) {
						               alert("Error: Position is unavailable!");
						            }
						         }
						      
						         function getLocation(){

						            if(navigator.geolocation){
						               // timeout at 60000 milliseconds (60 seconds)
						               var options = {timeout:60000};
						               navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
						            }
						            
						            else{
						               alert("Sorry, browser does not support geolocation!");
						            }
						         }



});