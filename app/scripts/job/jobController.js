(function () {
    'use strict';

    angular
        .module('app')
        .controller('jobController', ['jobService', '$q', '$mdDialog', 'adalAuthenticationService', JobController]);
    
    function JobController(jobService, $q, $mdDialog, adalService) {
        var self = this;

        self.selected = null;
        self.jobs = [];
        self.selectedIndex = 0;
        self.filterText = null;
        self.selectJob = selectJob;

        // Load initial data
        loadJobs();
        
        function selectJob(job, index) {
            console.log("JobController.selectJob");
            self.selected = angular.isNumber(job) ? self.subscriptions[job] : job;
            self.selectedIndex = angular.isNumber(job) ? job: index;
        }

        function loadJobs() {
            console.log("JobController.loadJobs");
            jobService.list().then(function (jobs) {
                self.jobs = [].concat(jobs);
                self.selected = jobs[0];
            });
        }
    }
})();
