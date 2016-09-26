
const batch = require("azure-batch");

module.exports = {
    hello: function() {
        return "*** clientProxy.hello ***";
    },

    /**
     * List jobs
     */
    listJobs: function(proxyOptions) {
        console.log("clientProxy::listJobs ", proxyOptions)
    
        const credentials = new batch.SharedKeyCredentials(proxyOptions.account, proxyOptions.key);
        const client = new batch.ServiceClient(credentials, proxyOptions.url);
        const options = { 
            jobListOptions: proxyOptions.jobListOptions 
        }
        
        let currentItems = [];
        return new Promise((resolve, reject) => {
            client.job.list(options, (error, result) => {

                const loop = (nextLink) => {
                    if (nextLink !== null && nextLink !== undefined) {
                        client.job.listNext(nextLink, function (err, res) {
                            currentItems = currentItems.concat(res);
                            loop(res.odatanextLink);
                        });
                    } else {
                        // Return all the items retrieved
                        resolve(currentItems);
                    }
                };
                
                if (error) throw error;
                if (result) {
                    currentItems = currentItems.concat(result);
                    loop(result.odatanextLink);
                }
            });
        })
    }, 

    /**
     * List pools
     */
    listPools: function(proxyOptions) {
        console.log("clientProxy::listPools ", proxyOptions)

        const credentials = new batch.SharedKeyCredentials(proxyOptions.account, proxyOptions.key);
        const client = new batch.ServiceClient(credentials, proxyOptions.url);
        const options = { 
            poolListOptions: proxyOptions.poolListOptions 
        }

        let currentItems = [];
        return new Promise((resolve, reject) => {
            client.pool.list(options, (error, result) => {

                const loop = (nextLink) => {
                    if (nextLink !== null && nextLink !== undefined) {
                        client.pool.listNext(nextLink, function (err, res) {
                            currentItems = currentItems.concat(res);
                            loop(res.odatanextLink);
                        });
                    } else {
                        // Return all the items retrieved
                        resolve(currentItems);
                    }
                };
                
                if (error) throw error;
                if (result) {
                    currentItems = currentItems.concat(result);
                    loop(result.odatanextLink);
                }
            });
        })
    }
}

