
(function () {
    "use strict";

    const batch = require("azure-batch");

    function Jobs(options) {
        const credentials = new batch.SharedKeyCredentials(options.account, options.key);
        const client = new batch.ServiceClient(credentials, options.url);

        return client.job;
    }
})();
