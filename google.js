
  $(document).ready(function() {
  /*
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 40.5745,
        lng: -74.6368
      }, //input by geolocator
      zoom: 15
    }); //END var map = new google.map 
  };
  */

  $('#inputloc').on('click', function() {
    //var map = new google.maps.Map(document.getElementById('map'));
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    var test2 = [];
    var infowindow;
    var placeId;
    var placeIdArray = [];
    //var catArray = ["amusement_park","aquarium","art_gallery","bowling_alley","campground","museum","park","zoo"];
    var catArray = ["museum","park","zoo"];


    searchNby();
    function searchNby() { //request   send send send 
      for (var i = 0; i < catArray.length; i++) {
        service.nearbySearch({
          location: {
            lat: 40.5745,
            lng: -74.6368
          },
          radius: 25000,
          type: catArray[i],
        }, callbackNby);
        console.log("fctn searchNby" + " " + catArray[i]);
      } // for (var i = 0; i < catArray.length; i++ )
    };

    function callbackNby(results, status) {
        for (var j = 0; j < results.length; j++){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log("fctn callbackNby" + " " +results.length)
            placeId = results[j].place_id;
            name = results[j].name;
            placeIdArray.push(placeId);
            console.log("fctn callbackNby" + " " +results[j].name + placeId);
            detailrqst(placeId);
          }// END   if (status === google.maps.places.PlacesServiceStatus.OK)
        }; // END  for (var j = 0; j < results.length; j++)
        }; // END  function callbackNby(results, status) {

      function detailrqst(){
             console.log("fctn detail request" + "" + placeId);
            service.getDetails({
              placeId: placeId 
            }, function(results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var rNAme = results.name;
                var rWebsite = results.website;
                var rfrmtphone = results.formatted_phone_number;
                var radd = results.formatted_address;
                
                    var eventDiv = $('<div>');
                    eventDiv.addClass('card');
                    var eventIntro = $('<p>');
                    eventIntro.addClass('card-block');
                    var introTitle = $('<h4>');
                    introTitle.addClass('card-title');
                    introTitle.text(rNAme);
                    //var startTime = result[i].start.local;
                    var introText = $('<p>');
                    introText.addClass('card-text');
                    introText.text(rWebsite);
                    //var eventImg = $('<img>');
                    //eventImg.addClass('card-img-top');
                    //eventImg.attr('src', result[i].logo.url)
                    eventIntro.append(introTitle);
                    eventIntro.append(introText);
                    //eventDiv.append(eventImg);
                    eventDiv.append(eventIntro);
                    $('#events').append(eventDiv);
                  

                test2.push({
                  rNAme: rNAme,
                  rWebsite: rWebsite,
                  rfrmtphone: rfrmtphone,
                  radd: radd
                }); // END test2.push 
              }  // END if (status === ok
                console.log(test2.rNAme);              
                
            });  // END function(results, status) 
        } //END  function detailsrqst()
   });
  //}; //END  function initMap()
}); //$(document).ready(function() 
   