(function () {
    'use strict';

    angular
        .module('app')
        .controller('subscriptionController', ['subscriptionService', 'electronService', '$q', '$mdDialog', 'adalAuthenticationService', SubscriptionController]);
    
    function SubscriptionController(subscriptionService, electronService, $q, $mdDialog, adalService) {
        var self = this;

        self.selected = null;
        self.subscriptions = [];
        self.selectedIndex = 0;
        self.filterText = null;
        self.selectSubscription = selectSubscription;
        self.info = {};

        // Load initial data
        getAllSubscriptions();
        loadInfo();
        
        //----------------------
        // Internal functions 
        //----------------------
        
        function selectSubscription(subscription, index) {
            console.log("SubscriptionController.selectSubscription");
            self.selected = angular.isNumber(subscription) ? self.subscriptions[subscription] : subscription;
            self.selectedIndex = angular.isNumber(subscription) ? subscription: index;
        }

        function getAllSubscriptions() {
            console.log("SubscriptionController.getAllSubscriptions");
            subscriptionService.list().then(function (subscriptions) {
                self.subscriptions = [].concat(subscriptions);
                self.selected = subscriptions[0];
            });
        }

        function loadInfo() {
            console.log("SubscriptionController.loadInfo");
            console.log(adalService.userInfo)
            electronService.info().then(function (response) {
                self.info = response;
            });
        }
    }
})();
