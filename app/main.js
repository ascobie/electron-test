
const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const restify = require('restify');
const storage = require('electron-json-storage');
const batch = require('azure-batch');
const Q = require('Q');

let mainWindow = null;

// Allows for live-reload while developing the app
//require('electron-reload')(__dirname + '/build');
require('electron-debug')({ 
    showDevTools: true 
});

function createWindow() {
    console.log("CreateWindow :: " + __dirname);
    console.log("UserData location: ", app.getPath('userData'))

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(path.join(__dirname, 'assets/preload.js')), // force the BrowserWindow to preload jQuery for AAD
            nodeIntegration: false
        }
    });

    // Tell Electron where to load the entry point from
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Clear out the main window when the app is closed
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// Start Restify API Server
let port = process.env.PORT || 3000;
let server = restify.createServer({ name: 'electron-backend', version: '1.0.0' });

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/info', (req, res, next) => {
    res.send({
        nodeVersion: process.versions.node,
        chromeVersion: process.versions.chrome,
        electronVersion: process.versions.electron,
        platform: process.platform
    });
});

server.get('/accounts', (req, res, next) => {
    storage.get("accounts", function(error, data) {
        if (error) throw error;
        if (Array.isArray(data)) {
            res.send(data);
        }

        res.send([]);
    });
});

server.post('/accounts', (req, res, next) => {
    let accountArray = [];
    storage.get("accounts", function(error, data) {
        if (error) throw error;
        if (Array.isArray(data)) {
            accountArray = accountArray.concat(data);
        }

        // validate data again at the server
        accountArray.push(req.params);
        saveToStorage('accounts', accountArray.filter(item => item !== null)).then(function (response) {
            res.send(201);
        });
    });
});

server.get('/jobs', (req, res, next) => {
    console.log("/jobs: ", req.query)
    const credentials = new batch.SharedKeyCredentials(req.query.account, req.query.key);
    const client = new batch.ServiceClient(credentials, req.query.url);
    const options = {}
    options.jobListOptions = { 
        maxResults : 25,
        select: "id,displayName,state,creationTime,poolInfo"
    };

    client.job.list(options, function (error, result) {
        var loop = function (nextLink) {
            if (nextLink !== null && nextLink !== undefined) {
                client.job.listNext(nextLink, function (err, res) {
                    console.log("loop result: ", res);
                    loop(res.odatanextLink);
                });
            }
        };

        if (error) throw error;
        if (result) {
            loop(result.odatanextLink);
        }
       
        res.send(result);
    });
});

server.listen(port, () => {
  console.log('server running on port ' + port);
});

function getFromStorage(fileName) {
    var deferred = Q.defer();
    storage.get(fileName, function(error, data) {
        if (error) {
            deferred.reject(error); 
        }

        console.log("getFromStorage", data);
        deferred.resolve(data)
    });

    return deferred.promise;
}

function saveToStorage(fileName, jsonData) {
    var deferred = Q.defer();
    storage.set(fileName, jsonData, function(error) {
        if (error) {
            deferred.reject(error); 
        }

        deferred.resolve(); 
    });

    return deferred.promise;
}

function logError(message) {
  let code = "window.localStorage.setItem('error', '" + message + "');";
  mainWindow.webContents.executeJavaScript(code);
}
