(function () {
    'use strict';

    const path = require("path");

    document.addEventListener("DOMNodeInserted", function(event) {
        if (!!window && !(!!window.$)) {
            window.$ = window.jQuery = require(path.join(__dirname, "vendor/jquery/dist/jquery.min.js"));
        }
    });
})();
