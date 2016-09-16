(function () {
    'use strict';
        
    const _templateBase = './scripts';
    const app = angular.module('app', ['ngRoute', 'AdalAngular', 'ngMaterial', 'ngAnimate']);

    app.config(['$locationProvider', function($locationProvider) {
        // html5Mode(true) with the <base> tag seems to destroy routing and i cant make it work. 
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);

    app.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
        $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
            if (current.hasOwnProperty('$$route')) {
                $rootScope.title = current.$$route.title;
            }
        });
    }]);

    app.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            // using to try and figure out routes
        });
    }]);

    app.config(['$routeProvider', '$httpProvider', '$provide', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, $provide, adalProvider) {
            $provide.decorator('$sniffer', function($delegate) {
                // not used at the moment
                return $delegate;
            });

            $routeProvider
                .when('/', {
                    redirectTo: '/home'
                })
                .when('/home', {
                    templateUrl: _templateBase + '/home/templates/home.html' ,
                    controller: 'homeController',
                    title: 'Home'
                })
                .when('/jobs', {
                    templateUrl: _templateBase + '/job/templates/job-list.html' ,
                    controller: 'jobController',
                    controllerAs: '_ctrl',
                    title: 'Jobs',
                    //requireADLogin: true

                })
                .when('/pools', {
                    templateUrl: _templateBase + '/pool/templates/pool-list.html' ,
                    controller: 'poolController',
                    controllerAs: '_ctrl',
                    title: 'Pools'
                })
            ;

            $routeProvider.otherwise({ redirectTo: "/home" });

            // AAD config. Cant get it to work with Electron as the callback is being dumb
            adalProvider.init({
                instance: 'https://login.microsoftonline.com/', 
                tenant: 'common',
                clientId: '38bd798b-779f-4866-9b25-708883817b33',
                extraQueryParameter: 'nux=1',
                //redirectUri: "http://localhost:3000/auth/azureoauth/callback",
                //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
            }, $httpProvider);
        }
    ]);
})();
