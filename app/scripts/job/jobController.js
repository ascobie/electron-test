
(function () {
    'use strict';

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
        self.jobs = [];
        self.selected = {};
        self.account = {};
        self.filterText = null;
        self.selectJob = function (job, index) {
            self.selected = angular.isNumber(index) ? self.jobs[index] : job;
        };

        $scope.$on("accountSelected", function(event, account) {
            console.log("accountSelected::JobController - ", account);
            self.account = account;
            loadJobs();
        });

        function loadJobs() {
            if (!self.account.key) {
                console.log("loadJobs():error: account not set")
                return;
            }

            $http.get(jobsUrl(self.account)).then(
                function (response) {
                    self.jobs = response.data; 
                }, function (error) {
                    console.log("loadJobs():error: ", error)
                }
            );
        }

        function jobsUrl(account) {
            return "http://localhost:3000/jobs?account=" + account.name + "&key=" + encodeURIComponent(account.key) + "&url=" + account.url; 
        }
    }
})();
