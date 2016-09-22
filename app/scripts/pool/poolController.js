(function () {
    'use strict';

    angular
        .module('app')
        .controller('poolController', ['poolService', '$q', '$mdDialog', '$scope', PoolController]);
    
    function PoolController(poolService, $q, $mdDialog, $scope) {
        var self = this;
        self.pools = [];
        self.selected = {};
        self.filterText = null;
        self.selectPool = function (pool, index) {
            console.log("PoolController.selectPool");
            self.selected = angular.isNumber(index) ? self.pools[index] : pool;
        };

        // load initial data
        loadPools();

        function loadPools() {
            console.log("PoolController.loadPools");
            poolService.list().then(function (pools) {
                self.pools = [].concat(pools);
                self.selected = pools[0];
            });
        }

        $scope.$on("accountSelected", function(event, account) {
            console.log("accountSelected::PoolController - ", account);
            self.account = account;
        });
    }
})();
