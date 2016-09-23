
(function () {
    'use strict';

    const _templateBase = './scripts';
    const app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngAnimate']);

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

    app.config(['$routeProvider', '$httpProvider', '$provide', function ($routeProvider, $httpProvider, $provide) {
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
                .when('/pools', {
                    templateUrl: _templateBase + '/pool/templates/pools.html' ,
                    controller: 'poolController',
                    controllerAs: '_ctrl'
                })
            ;

            $routeProvider.otherwise({ redirectTo: "/home" });
        }
    ]);
})();
