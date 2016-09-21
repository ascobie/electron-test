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
                    controller: 'homeController'
                })
                .when('/accounts', {
                    templateUrl: _templateBase + '/account/templates/accounts.html' ,
                    controller: 'accountController',
                    controllerAs: '_ctrl'

                })
                .when('/jobs', {
                    templateUrl: _templateBase + '/job/templates/jobs.html' ,
                    controller: 'jobController',
                    controllerAs: '_ctrl'

                })
                .when('/jobschedules', {
                    templateUrl: _templateBase + '/jobSchedule/templates/jobSchedules.html' ,
                    controller: 'jobController',
                    controllerAs: '_ctrl'

                })
                .when('/pools', {
                    templateUrl: _templateBase + '/pool/templates/pools.html' ,
                    controller: 'poolController',
                    controllerAs: '_ctrl'
                })
            ;

            $routeProvider.otherwise({ redirectTo: "/home" });

            // AAD config. Cant get it to work with Electron as the callback is being dumb
            adalProvider.init({
                //instance: 'https://login.microsoftonline.com/', 
                authorityHostUrl: 'https://login.windows.net',
                tenant: 'common',
                clientId: 'f9dfefa2-423e-4391-9e87-8bcb4d161962',
                extraQueryParameter: 'nux=1',
                resource: "https://graph.microsoft.com",
                redirectUri: "http://localhost:3000/auth/azureoauth/callback",
                endpoints: {
	                graphApiUri: 'https://graph.microsoft.com'
	            },
                //endpoints: ["http://localhost:3000", "36c32244-348e-4f3d-945d-9158435fcd48"],
                cacheLocation: 'localStorage'
            }, $httpProvider);
        }
    ]);
})();
