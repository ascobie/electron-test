
const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const restify = require('restify');

const url = require('url');
const crypto = require('crypto');
const AuthenticationContext = require('adal-node').AuthenticationContext;
const AdalMainConfig = {
    authorityHostUrl:'https://login.windows.net',
    instance: 'https://login.microsoftonline.com/',     
    tenant: 'common',
    clientId: '36c32244-348e-4f3d-945d-9158435fcd48',
    clientSecret: '',
    extraQueryParameter: 'nux=1',
    resource: "https://graph.microsoft.com",
    redirectUri:  "http://localhost:3000/auth/azureoauth/callback",
}

let mainWindow = null;

// Allows for live-reload while developing the app
//require('electron-reload')(__dirname + '/build');
require('electron-debug')({ 
    showDevTools: true 
});

function createWindow() {
    console.log("CreateWindow :: " + __dirname);
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
    console.log("ACTIVATE");
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// ADAL Settings
let authToken = '';
let authorityUrl = AdalMainConfig.authorityHostUrl + '/' + AdalMainConfig.tenant;
let templateAuthzUrl = 'https://login.windows.net/' + AdalMainConfig.tenant + '/oauth2/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>&state=<state>&resource=<resource>';
let tenantID = '';
let accessToken = '';
let refreshToken = '';
let user = {
    userID: '',
    lastName: '',
    firstName: '',
    fullName: ''
}

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

// dont know if this is needed
server.get('/auth', (req, res, next) => {
  console.log("Authenticate attempt!")
  clearStorage();

  crypto.randomBytes(48, function (ex, buf) {
    var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');

    this.authToken = token;
    //res.cookie('authstate', token);
    var authorizationUrl = createAuthorizationUrl(token);

    console.log("Auth URL: " + authorizationUrl);
    //res.redirect(authorizationUrl);
    mainWindow.loadURL(authorizationUrl);
  });
});

// this is the callback from AAD
server.get('/auth/azureoauth/callback', (req, res, next) => {
  // TODO: Need to investigate query state fix - low priority
  // if (this.authToken !== req.query.state) {
  //   console.log('error: state does not match');
  //   res.send('error: state does not match');
  // }
  
    console.log("CALLBACK: /auth/azureoauth/callback");

    console.log("req :: ", req);
    console.log("#####################################################################");
    console.log("res :: ", res);
    console.log("#####################################################################");
    console.log("next :: ", next);
    console.log("#####################################################################");

mainWindow.loadURL('file://' + __dirname + '/index.html');

    /*

    var authenticationContext = new AuthenticationContext(authorityUrl);
    authenticationContext.acquireTokenWithAuthorizationCode(req.query.code, AdalMainConfig.redirectUri, AdalMainConfig.resource, AdalMainConfig.clientId, AdalMainConfig.clientSecret, function (err, response) {
        console.log("RETURN FROM acquireTokenWithAuthorizationCode");
        console.log(req.query);
        console.log(response);

        var message = '';
        if (err) {
            message = 'got aad error: ' + err.message + '\n';
            logError(message);

            return;
        }

        accessToken = response.accessToken;
        refreshToken = response.refreshToken;
        tenantID = response.tenantId;
        user.userID = response.userId;
        user.lastName = response.familyName;
        user.firstName = response.firstName;
        user.fullName = response.firstName + ' ' + response.familyName;

        // console.log("User: " + JSON.stringify(user));
        // console.log("Access Token: " + response.accessToken);
        // console.log("Refresh Token:" + response.refreshToken);

        //saveTokens();
        //saveUser();

        mainWindow.loadURL('file://' + __dirname + '/index.html');

        // Later, if the access token is expired it can be refreshed.
        authenticationContext.acquireTokenWithRefreshToken(response.refreshToken, AdalMainConfig.clientId, AdalMainConfig.clientSecret, AdalMainConfig.resource, function (refreshErr, refreshResponse) {
            if (refreshErr) {
                message += 'refreshError: ' + refreshErr.message + '\n';
                logError(message);
            }

            accessToken = response.accessToken;
            refreshToken = response.refreshToken;
            tenantID = response.tenantId;
            user.userID = response.userId;
            user.lastName = response.familyName;
            user.firstName = response.firstName;
            user.fullName = response.firstName + ' ' + response.familyName;

            //saveTokens();
            //saveUser();
        });
    });

    */
});

server.listen(port, () => {
  console.log('server running on port ' + port);
});


function createAuthorizationUrl(state) {
    var authorizationUrl = templateAuthzUrl.replace('<client_id>', AdalMainConfig.clientId);
    authorizationUrl = authorizationUrl.replace('<redirect_uri>', AdalMainConfig.redirectUri);
    authorizationUrl = authorizationUrl.replace('<state>', state);
    authorizationUrl = authorizationUrl.replace('<resource>', AdalMainConfig.resource);

    return authorizationUrl;
}


function logError(message) {
  let code = "window.localStorage.setItem('error', '" + message + "');";
  mainWindow.webContents.executeJavaScript(code);
}

function saveTokens() {
  let code = "window.localStorage.setItem('accessToken', '" + accessToken + "');";
  mainWindow.webContents.executeJavaScript(code);
}

function saveUser() {
  let code = "window.localStorage.setItem('user', '" + JSON.stringify(user) + "');";
  mainWindow.webContents.executeJavaScript(code);
}

function clearStorage(){
  let code = "window.localStorage.clear()";
  mainWindow.webContents.executeJavaScript(code);
}
