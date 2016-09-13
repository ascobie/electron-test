
(function () {
    'use strict';
    
    const msRestAzure = require('ms-rest-azure');
    const batchManagementClient = require('azure-arm-batch');

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



/*
            var subscriptionClient = new SubscriptionManagementClient(credentials);
            setTimeout(function () {
                console.log('Fetching subscriptions as the environment variable was not set.')
                subscriptionClient.subscriptions.list(function (err, subscriptionList) {
                    if (err) {
                        console.error(err);
                    }
                    
                    subscriptionId = subscriptionList[0].subscriptionId;
                    console.log('\nSetting \'' + subscriptionId + '\' as the current subscription...');
                    
                    //return callback(null);
                });
            }, 5000);

            msRestAzure.interactiveLogin(function(err, credentials) {
                var client = new batchManagementClient(credentials, 'your-subscription-id');
                client.account.list(rgName, function(err, result, request, response) {
                    if (err) {
                        console.error(err);
                    }
                    
                    console.log(result);
                });
            });
*/
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
