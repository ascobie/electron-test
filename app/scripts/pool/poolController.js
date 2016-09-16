(function () {
    'use strict';

    angular
        .module('app')
        .controller('poolController', ['poolService', '$q', '$mdDialog', 'adalAuthenticationService', PoolController]);
    
    function PoolController(poolService, $q, $mdDialog, adalService) {
        var self = this;
        
        self.selected = null;
        self.pools = [];
        self.selectedIndex = 0;
        self.filterText = null;
        self.selectPool = selectPool;

        // Load initial data
        loadPools();

        function selectPool(pool, index) {
            console.log("PoolController.selectPool");
            self.selected = angular.isNumber(pool) ? self.subscriptions[pool] : pool;
            self.selectedIndex = angular.isNumber(pool) ? pool: index;
        }

        function loadPools() {
            console.log("PoolController.loadPools");
            poolService.list().then(function (pools) {
                self.pools = [].concat(pools);
                self.selected = pools[0];
            });
        }
    }
})();
