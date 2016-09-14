(function () {
    'use strict';
    
    // console.log("__dirname:", __dirname);
    
    const _templateBase = './scripts';
    const app = angular.module('app', ['ngRoute', 'AdalAngular', 'ngMaterial', 'ngAnimate']);

    app.config(['$locationProvider', function($locationProvider) {
        //$locationProvider.html5Mode(true);
    }]);

    app.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/subscription/templates/subscription-list.html' ,
                controller: 'subscriptionController',
                controllerAs: '_ctrl',
                requireADLogin: true
            });

            $routeProvider.otherwise({ redirectTo: '/' });

            adalProvider.init({
                instance: 'https://login.microsoftonline.com/', 
                tenant: 'microsoft.onmicrosoft.com',
                clientId: '38bd798b-779f-4866-9b25-708883817b33',
                extraQueryParameter: 'nux=1',
                redirectUri: "http://localhost:3000/auth/azureoauth/callback",
                //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
            }, $httpProvider);
        }
    ]);

})();
