
const electron = require('electron');
const { app, BrowserWindow } = electron;

const restify = require('restify');
/*
const url = require('url');
const crypto = require('crypto');
const AuthenticationContext = require('adal-node').AuthenticationContext;
const AdalMainConfig = {
    instance: 'https://login.microsoftonline.com/', 
    authorityHostUrl:'https://login.windows.net',
    tenant: 'microsoft.onmicrosoft.com',
    clientId: '38bd798b-779f-4866-9b25-708883817b33',
    clientSecret: '',
    extraQueryParameter: 'nux=1',
    resource: "https://graph.microsoft.com",
    //redirectUri:  "http://localhost:3000/auth/azureoauth/callback",
    postLogoutRedirectUri: "",
    endpoints: {
        graphApiUri:'https://graph.microsoft.com'
    }
}
*/
let mainWindow = null;

// Allows for live-reload while developing the app
//require('electron-reload')(__dirname + '/build');
require('electron-debug')({ 
    showDevTools: true 
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            //nodeIntegration: false
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
//let authorityUrl = AdalMainConfig.authorityHostUrl + '/' + AdalMainConfig.tenant;
//let templateAuthzUrl = 'https://login.windows.net/' + AdalMainConfig.tenant + '/oauth2/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>&state=<state>&resource=<resource>';
//let tenantID = '';
let accessToken = '';
//let refreshToken = '';
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

server.get('/auth/azureoauth/callback', (req, res, next) => {
  // TODO: Need to investigate query state fix - low priority
  // if (this.authToken !== req.query.state) {
  //   console.log('error: state does not match');
  //   res.send('error: state does not match');
  // }
  
    console.log("CALLBACK: /auth/azureoauth/callback");
    console.log("req: " + req);
    console.log("res: " + res);
    console.log("next: " + next);
});

server.listen(port, () => {
  console.log('server running on port ' + port);
});

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
