(function () {
    'use strict';
    
    angular
        .module('app')
        .service('jobService', ['$q', JobService]);
    
    function JobService($q) {
        return {
            list: listJobs,
            getById: getJobById
        };

        function listJobs() {
            console.log("JobService.listJobs");
            var deferred = $q.defer();

            deferred.resolve([
                {id: "job-1", name: "job1-fromlist", selected: false },
                {id: "job-2", name: "job2-fromlist", selected: false  },
                {id: "job-3", name: "job2-fromlist", selected: false  }
            ]);

            return deferred.promise;
        }

        function getJobById(id) {
            console.log("JobService.getJobById");
            var deferred = $q.defer();
            deferred.resolve({ id: "job-1", name: "job1-fromGetById", selected: true });

            return deferred.promise;
        }
    }
})();
