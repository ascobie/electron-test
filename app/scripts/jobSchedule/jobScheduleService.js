(function () {
    'use strict';
    
    angular
        .module('app')
        .service('jobScheduleService', ['$q', JobScheduleService]);
    
    function JobScheduleService($q) {
        return {
            list: listjobSchedules,
            getById: getjobScheduleById
        };

        function listJobSchedules() {
            console.log("JobScheduleService.listJobSchedules");
            var deferred = $q.defer();

            deferred.resolve([]);

            return deferred.promise;
        }

        function getJobScheduleById(id) {
            console.log("JobScheduleService.getJobScheduleById");
            var deferred = $q.defer();
            deferred.resolve({ id: "1", name: "schedule1-fromgetbyid", selected: false });

            return deferred.promise;
        }
    }
})();
