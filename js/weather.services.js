var task1_service = angular.module('task1_service', ['task1_constants']);

task1_service.service('WeatherService', function ($q, $http, APIConstants) {
    var self = this;

    this.getWeatherDataByCoords = function (lat, lon) {
        var dfd = $q.defer();
        var url = APIConstants.API_URL + '?lat=' + lat + '&lon=' + lon + '&APPID=' + APIConstants.API_USER_KEY;

        $http.get(url, {headers: {"Content-Type": "application/json"}})
            .success(function (data) {
                dfd.resolve(data);
            })
            .error(function (data, status, headers) {
                dfd.reject({"data": data, "status": status, "headers": headers});
            });

        return dfd.promise;
    };

    this.getWeatherDataByCountry = function (location) {
      var dfd = $q.defer();
      var url = APIConstants.API_URL + '?zip=' + location + '&APPID=' + APIConstants.API_USER_KEY;

      $http.get(url, {headers: {"Content-Type": "application/json"}})
          .success(function (data) {
              dfd.resolve(data);
          })
          .error(function (data, status, headers) {
              dfd.reject({"data": data, "status": status, "headers": headers});
          });

      return dfd.promise;
    }
});
