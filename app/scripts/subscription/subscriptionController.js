(function () {
    'use strict';

    console.log("SubscriptionController");

    angular.module('app')
        .controller('subscriptionController', ['subscriptionService', '$q', '$mdDialog', SubscriptionController]);
    
    function SubscriptionController(subscriptionService, $q, $mdDialog) {
        var self = this;

        self.selected = null;
        self.subscriptions = [];
        self.selectedIndex = 0;
        self.filterText = null;
        self.selectSubscription = selectSubscription;
        
        // Load initial data
        console.log("should be calling: getAllSubscriptions");
        getAllSubscriptions();
        
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
                console.log("got: ", subscriptions);
                self.subscriptions = [].concat(subscriptions);
                self.selected = subscriptions[0];
            });
        }
    }

})();
