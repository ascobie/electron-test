(function () {
    'use strict';

    angular
        .module('app')
        .controller('jobScheduleController', ['jobScheduleService', '$q', '$mdDialog', '$scope', JobScheduleController]);
    
    function JobScheduleController(jobScheduleService, $q, $mdDialog, $scope) {
        var self = this;
        self.selected = {};
        self.jobSchedules = [];
        self.filterText = null;
        self.selectSchedule = function (jobSchedule, index) {
            console.log("JobScheduleController.selectJobSchedule");
            self.selected = angular.isNumber(index) ? self.jobSchedules[index] : jobSchedule;
        };

        // load initial data
        getAllJobSchedules();

        function getAllJobSchedules() {
            console.log("JobScheduleController.getAllJobSchedules");
            jobScheduleService.list().then(function (jobSchedules) {
                self.jobSchedules = [].concat(jobSchedules);
                self.selected = jobSchedules[0];
            });
        }

        $scope.$on("accountSelected", function(event, account) {
            console.log("accountSelected::JobScheduleController - ", account);
            self.account = account;
        });
    }
})();
