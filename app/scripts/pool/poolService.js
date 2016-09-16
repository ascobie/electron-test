(function () {
    'use strict';
    
    angular
        .module('app')
        .service('poolService', ['$q', PoolService]);
    
    function PoolService($q) {
        return {
            list: listPools,
            getById: getPoolById
        };

        function listPools() {
            console.log("PoolService.listPools");
            var deferred = $q.defer();

            deferred.resolve([
                {id: "pool-1", name: "pool1-fromlist", selected: false },
                {id: "pool-2", name: "pool2-fromlist", selected: false  },
                {id: "pool-3", name: "pool2-fromlist", selected: false  }
            ]);

            return deferred.promise;
        }

        function getPoolById(id) {
            console.log("PoolService.getPoolById");
            var deferred = $q.defer();
            deferred.resolve({ id: "pool-1", name: "pool1-fromGetById", selected: true });

            return deferred.promise;
        }
    }
})();
