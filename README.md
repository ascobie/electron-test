# electron-test
First look into building an Electron app with Angular and Node.js

## installation 
Install all the dependancies for this application

### pre-install steps
Install Node.js from <https://nodejs.org/en/download/>. also make sure you update npm to the latest current version: *npm install npm -g*

* npm install -g bower
* npm install -g less

### install the node dependencies for the electron runtime and build
1. bower install
2. npm install
3. cd app

### install the node dependencies for the app runtime
4. npm install 

## running the electron app
Open the electron-test folder in Visual Studio Code.
Press ctrl + shift + b to run the app

## gulp 
All of the build, package, and run commands are in the gulp file: **gulpfile.js**

### build the less stylesheets
gulp build-less

### create the main run task 
gulp run

### clean build directory if it already exists.
gulp clean

### copy application files into build directory
gulp copy

### compiles down all the CSS and JS and copies the applicaiton files into the build directory
gulp build

### execute the build script and build a package installer
gulp build-electron

