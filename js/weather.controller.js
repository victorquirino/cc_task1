var task1 = angular.module('task1', ['task1_service']);

task1.controller('GeoCtrl', function($scope, $window, WeatherService){
  var response = $window.confirm('This page wants to get you location. Do you alow?');
  $scope.geoLocationCoords = false;

  if(response){
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      WeatherService.getWeatherData(lat, lon)
        .then(function (data){
          console.log(data);
        })
        .catch(function (error){

        });
      });
      $scope.geoLocationCoords = true;
  } else{
      $scope.geoLocationCoords = false;
  }
});
