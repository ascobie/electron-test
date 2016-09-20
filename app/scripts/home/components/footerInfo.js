(function () {
    "use strict";

    angular
        .module("app")
        .component("footerInfo", {
            templateUrl: "./scripts/home/templates/footer-info.html",
            controllerAs: "_ctrl",
            controller: FooterInfoController
        });

    function FooterInfoController($scope, electronService) {
        var self = this;        
        self.systemInfo = {};
        loadInfo();

        function loadInfo() {
            console.log("FooterInfoController.loadInfo");
            electronService.info().then(function (response) {
                self.systemInfo = response;
            });
        }
    }
})();