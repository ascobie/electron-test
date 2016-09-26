
(function () {
    'use strict';

    // import the injected batchClient proxy    
    const batchClient = require("./api/batch/batch-client");

    angular
        .module('app')
        .controller('jobController', [
            'jobService', 
            '$q', 
            '$scope', 
            '$http',
            JobController
        ]);
    
    function JobController(jobService, $q, $scope, $http) {
        var self = this;
        self.jobs = null;
        self.selected = {};
        self.account = {};
        self.filterText = null;
        self.selectJob = function (job, index) {
            self.selected = angular.isNumber(index) ? $scope.jobs[index] : job;
        };

        $scope.$on("accountSelected", function(event, account) {
            self.account = account;
            loadJobs();
        });

        function loadJobs() {
            if (!self.account.key) {
                console.log("loadJobs():error: account not set")
                return;
            }

            const options = {
                url: self.account.url,
                account: self.account.name,
                key: self.account.key,
                jobListOptions: {
                    maxResults : 25,
                    select: "id,displayName,state,creationTime,poolInfo"
                }
            }

            batchClient.listJobs(options).then((data) => {
                $scope.$apply(function () { 
                    self.jobs = data;
                    console.log("self.jobs.length: ", self.jobs.length);
                });
            }).catch((error) => {
                console.log("loadJobs():error: ", error)
            });
        }
    }
})();
