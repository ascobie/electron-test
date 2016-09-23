// get the dependencies
var gulp            = require('gulp'); 
var less            = require('gulp-less')
var childProcess    = require('child_process'); 
var electron        = require('electron-prebuilt'); 
var jetpack         = require('fs-jetpack'); 
var usemin          = require('gulp-usemin'); 
var uglify          = require('gulp-uglify');

var projectDir      = jetpack; 
var srcDir          = projectDir.cwd('./app'); 
var destDir         = projectDir.cwd('./build');

// for builds 
var release_windows = require('./resources/windows/build.windows'); 
var os = require('os'); 

// build the less stylesheets
gulp.task('build-less', function(){
    return gulp.src('./app/assets/css/main.less')
        .pipe(less())
        .pipe(gulp.dest('./app/assets/css'));
});

// create the main run task 
gulp.task('run', ['build-less'], function () {
    // childProcess.spawn(electron, ['./app'], { stdio: 'inherit' });
    childProcess.spawn(electron, ['--debug=5858','./app'], { stdio: 'inherit' }); 
});

// clean build directory if it already exists.
gulp.task('clean', function (callback) { 
    return destDir.dirAsync('.', { empty: true }); 
});

// copy files into build directory
gulp.task('copy', ['clean', 'build-less'], function () { 
    return projectDir.copyAsync('app', destDir.path(), { 
        overwrite: true, matching: [ 
            './node_modules/**/*', 
            './assets/**/*', 
            '*.html', 
            '*.css', 
            'main.js', 
            'package.json' 
       ] 
    }); 
});

// the build task
gulp.task('build', ['copy'], function () { 
  return gulp.src('./app/index.html') 
    .pipe(usemin({ 
      js: [uglify()] 
    })) 
    .pipe(gulp.dest('build/')); 
}); 

// execute the build script
gulp.task('build-electron', ['build'], function () { 
    switch (os.platform()) { 
        case 'darwin': 
            // execute build.osx.js 
            break; 
        case 'linux': 
            //execute build.linux.js 
            break; 

        case 'win32': 
            return release_windows.build(); 
    }
}); 
