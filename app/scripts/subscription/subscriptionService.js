
(function () {
    'use strict';
    
    angular.module('app')
        .service('subscriptionService', ['$q', SubscriptionService]);
    
    function SubscriptionService($q) {
        console.log("SubscriptionService");
        return {
            list: listSubscriptions,
            getById: getSubscriptionById
        };

        function listSubscriptions() {
            console.log("SubscriptionService.listSubscriptions");
            var deferred = $q.defer();

            deferred.resolve([
                {id: "1", name: "andrew1-fromlist", selected: false },
                {id: "2", name: "andrew2-fromlist", selected: false  }
            ]);

            return deferred.promise;
        }

        function getSubscriptionById(id) {
            console.log("SubscriptionService.getSubscriptionById");
            var deferred = $q.defer();
            deferred.resolve({ id: "1", name: "andrew1-fromgetbyid", selected: false });

            return deferred.promise;
        }
    }
})();
