(function () {
    'use strict';

    angular
        .module('app')
        .controller('jobScheduleController', ['jobScheduleService', '$q', '$mdDialog', 'adalAuthenticationService', JobScheduleController]);
    
    function JobScheduleController(jobScheduleService, $q, $mdDialog, adalService) {
        var self = this;

        self.selected = null;
        self.jobSchedules = [];
        self.selectedIndex = 0;
        self.filterText = null;
        self.selectSchedule = selectJobSchedule;

        // Load initial data
        getAllJobSchedules();
        
        //----------------------
        // Internal functions 
        //----------------------
        
        function selectJobSchedule(jobSchedule, index) {
            console.log("JobScheduleController.selectJobSchedule");
            self.selected = angular.isNumber(jobSchedule) ? self.jobSchedules[jobSchedule] : jobSchedule;
            self.selectedIndex = angular.isNumber(jobSchedule) ? jobSchedule : index;
        }

        function getAllJobSchedules() {
            console.log("JobScheduleController.getAllJobSchedules");
            jobScheduleService.list().then(function (jobSchedules) {
                self.jobSchedules = [].concat(jobSchedules);
                self.selected = jobSchedules[0];
            });
        }
    }
})();
