
const electron = require('electron');
const { app, BrowserWindow } = electron;

const restify = require('restify');

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
let accessToken = '';
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

  /*
  clearStorage();

  var authenticationContext = new AuthenticationContext(authorityUrl);
  authenticationContext.acquireTokenWithAuthorizationCode(req.query.code, AdalMainConfig.redirectUri, AdalMainConfig.resource, AdalMainConfig.clientId, AdalMainConfig.clientSecret, function (err, response) {
    var message = '';
    if (err) {
      message = 'error: ' + err.message + '\n';
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

    saveTokens();
    saveUser();

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

      saveTokens();
      saveUser();
    });
  });
  */
});

server.listen(port, () => {
  console.log('server running on port ' + port);
});

function logError(message) {
  let code = "localStorage.setItem('error', '" + message + "');";
  mainWindow.webContents.executeJavaScript(code);
}

function saveTokens() {
  let code = "localStorage.setItem('accessToken', '" + accessToken + "');";
  mainWindow.webContents.executeJavaScript(code);
}

function saveUser() {
  let code = "localStorage.setItem('user', '" + JSON.stringify(user) + "');";
  mainWindow.webContents.executeJavaScript(code);
}

function clearStorage(){
  let code = "localStorage.clear()";
  mainWindow.webContents.executeJavaScript(code);
}
