(function () {
    'use strict';

    angular
        .module('app')
        .controller('jobController', [
            'jobService', 
            '$q', 
            '$mdDialog', 
            '$scope', 
            '$http',
            JobController
        ]);
    
    function JobController(jobService, $q, $mdDialog, $scope, $http) {
        var self = this;
        self.jobs = [];
        self.selected = {};
        self.account = {};
        self.filterText = null;
        self.selectJob = function (job, index) {
            self.selected = angular.isNumber(index) ? self.jobs[index] : job;
        };

        // load initial data
        loadJobs();

        function loadJobs() {
            $http.get("http://localhost:3000/jobs").then(
                function (response) {
                    self.jobs = response.data; 
                }, function (error) {
                    console.log("loadJobs():error: ", error)
                }
            );
        }

        $scope.$on("accountSelected", function(event, account) {
            console.log("accountSelected::JobController - ", account);
            self.account = account;
        });
    }
})();
