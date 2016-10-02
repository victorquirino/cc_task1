var task1 = angular.module('task1', ['task1_service']);

task1.controller('GeoCtrl', function($scope, $window, WeatherService){
  var response = $window.confirm('This page wants to get you location. Do you alow?');
  $scope.loadingView = false;

  $scope.$on('getWeatherInit', function(){
    $scope.loadingView = true;
  });

  $scope.$on('getWeatherFinished', function(){
    $scope.loadingView = false;
  });

  if(response){
    $scope.$emit('getWeatherInit');
    $scope.geoLocationCoords = true;

    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      WeatherService.getWeatherDataByCoords(lat, lon)
        .then(function (data){
          $scope.nameCity = data.name;
          $scope.weather = data.weather[0].main;
          $scope.weatherDetails = data.weather[0].description;
          $scope.country = data.sys.country;
        })
        .catch(function (error){
          $scope.errorMsg = 'We are having some troubles, please try again later.'
        })
        .finally(function(){
          $scope.$emit('getWeatherFinished');
        });
      });
  } else{
      $scope.geoLocationCoords = false;
  }

  $scope.getWeatherByCountry = function(){
    $scope.$emit('getWeatherInit');
    $scope.PostalCodeCountry;

    WeatherService.getWeatherDataByCountry($scope.PostalCodeCountry)
      .then(function (data){
        $scope.nameCity = data.name;
        $scope.weather = data.weather[0].main;
        $scope.weatherDetails = data.weather[0].description;
        $scope.country = data.sys.country;
      })
      .catch(function (error){
        $scope.errorMsg = 'We are having some troubles, please try again later.'
      })
      .finally(function(){
        $scope.$emit('getWeatherFinished');
      });
  }
});
