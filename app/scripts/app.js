(function () {
    'use strict';
    
    var _templateBase = './scripts';
    console.log("app/js loaded");

    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            console.log("$routeProvider: ", $routeProvider);
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/subscription/templates/subscription-list.html' ,
                controller: 'subscriptionController',
                controllerAs: '_ctrl'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);
})();