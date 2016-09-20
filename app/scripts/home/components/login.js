(function () {
    "use strict";

    angular
        .module("app")
        .component("login", {
            templateUrl: "./scripts/home/templates/login-user-details.html",
            controllerAs: "_ctrl",
            controller: UserLoginController
        });

    function UserLoginController() {
        this.user = "andrew.scobie@microsoft.com";
        
        this.login = function () {
            console.log("this.login");
        };

        this.logout = function () {
            console.log("this.logout");
        };
    }

})();