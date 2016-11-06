// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example= angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


//controller pour la féolocalisation avec open street map

example.controller("OsmController",function($scope){
  map = new OpenLayers.Map("map");
  map.addLayer(new OpenLayers.Layer.OSM());

  // fonction pour la géolocalisation
  navigator.geolocation.getCurrentPosition(function(position) {

       var lonLat = new OpenLayers.LonLat(position.coords.longitude,
                               position.coords.latitude)
                 .transform(
                             new OpenLayers.Projection("EPSG:4326"), //ransformation de WGS à 1984
                                         map.getProjectionObject() //à une projection sphérale
                                       );

       markers.addMarker(new OpenLayers.Marker(lonLat));

       map.setCenter(lonLat, 16 // niveau de zoom
       );

   });

  var markers = new OpenLayers.Layer.Markers( "Markers" );
  map.addLayer(markers);

  $scope.map=map;
});


//cntrolleur pour la géolocalisation avec google map

example.controller("MapController",function($scope){
  google.maps.event.addDomListener(window,"load", function(){
    var myLatLng = new google.maps.LatLng(37.000,-120.4833);

  var mapOptions={
    center:myLatLng,
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map= new google.maps.Map(document.getElementById("map"),mapOptions);

  navigator.geolocation.getCurrentPosition(function(pos){
    map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
  });


  $scope.map=map;

});
});
