(function () {
    'use strict';
    
    const _templateBase = './scripts';

    angular.module('app', ['ngRoute', 'AdalAngular', 'ngMaterial', 'ngAnimate'])
    .config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/subscription/templates/subscription-list.html' ,
                controller: 'subscriptionController',
                controllerAs: '_ctrl'
            });

            $routeProvider.otherwise({ redirectTo: '/' });

            adalProvider.init({
                instance: 'https://login.microsoftonline.com/', 
                tenant: 'microsoft.onmicrosoft.com',
                clientId: '36c32244-348e-4f3d-945d-9158435fcd48',
                extraQueryParameter: 'nux=1',
                //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
            }, $httpProvider);
        }
    ]);

})();