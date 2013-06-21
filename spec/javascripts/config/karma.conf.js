// Karma configuration
// Generated on Wed May 29 2013 13:33:43 GMT+0100 (BST)


// base path, that will be used to resolve files and exclude
basePath = '../../../';


// list of files / patterns to load in the browser
// angular 
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js',
  'spec/javascripts/lib/angular-mocks.js',
  'app/assets/javascripts/app.js',
  'app/assets/javascripts/**/*.js',
  'spec/javascripts/unit/*.js'
];


// list of files to exclude
exclude = [
 'app/assets/javascripts/application.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
