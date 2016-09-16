(function() {
  'use strict';

  // Initialize Angular module

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)

    // Build main controller
    .controller('mainCtrl', function($scope, dataService) {

      // Handle dataservice input
      dataService.getAPOD(function(response) {
        $scope.apod = response.data;

        // Add Title data to html
        if ("title" in $scope.apod) {
          $("#apod_title").text($scope.apod.title);
        }

        // Translate date into standard form and add to html
        if ("date" in $scope.apod) {
          var year = $scope.apod.date.substr(0, 4);
          var month = $scope.apod.date.substr(5, 2);
          var day = $scope.apod.date.substr(8, 2);

          var date = new Date(year, month - 1, day);

          var monthNames = new Array();
          monthNames[0] = "January";
          monthNames[1] = "February";
          monthNames[2] = "March";
          monthNames[3] = "April";
          monthNames[4] = "May";
          monthNames[5] = "June";
          monthNames[6] = "July";
          monthNames[7] = "August";
          monthNames[8] = "September";
          monthNames[9] = "October";
          monthNames[10] = "November";
          monthNames[11] = "December";
          month = monthNames[date.getMonth()];

          $("#apod_date").text(month + " " + date.getDate() + ", " + date.getFullYear());
        }

        // Append explanation if present
        if ("explanation" in $scope.apod) {
          $("#apod_explanation").text($scope.apod.explanation);
        }

        // Handle copyright data
        if ("copyright" in $scope.apod) {
          $("#apod_copyright").text("Image Credits: " + result.copyright);
        } else {
          $("#apod_copyright").text("Image Credits: " + "Public Domain");
        }

        // Handle potential video content
        if($scope.apod.media_type == "video") {
          $("#apod_img_id").css("display", "none");
          $("#apod_vid_id").attr("src", $scope.apod.url);
        }
        else {
          $("#apod_vid_id").css("display", "none");
          $("#apod_img_id").attr("src", $scope.apod.hdurl).attr("alt", $scope.apod.title);
        }
      });
    })

    // Create service for API call
    .service('dataService', function($http) {
      this.getAPOD = function(callback) {
        $http.get('https://api.nasa.gov/planetary/apod?api_key=AN3UrSTXTpDASIHrSoG3QJPYYvA70fDztluivUZL')
            .then(callback)
      }
    })
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
