// get the dependencies
var gulp         = require('gulp'); 
var childProcess = require('child_process'); 
var electron     = require('electron-prebuilt'); 
var jetpack      = require('fs-jetpack'); 
var usemin       = require('gulp-usemin'); 
var uglify       = require('gulp-uglify');

var projectDir = jetpack; 
var srcDir     = projectDir.cwd('./app'); 
var destDir    = projectDir.cwd('./build');

// for builds 
var release_windows = require('./build.windows'); 
var os = require('os'); 

// create the gulp task
gulp.task('run', function () {
    childProcess.spawn(electron, ['./app'], { stdio: 'inherit' });
});

// clean build directory if it already exists.
gulp.task('clean', function (callback) { 
    return destDir.dirAsync('.', { empty: true }); 
});

// copy files into build directory
gulp.task('copy', ['clean'], function () { 
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
