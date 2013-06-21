// Karma configuration
// Generated on Wed May 29 2013 13:33:43 GMT+0100 (BST)


// base path, that will be used to resolve files and exclude
basePath = '../../../';


// list of files / patterns to load in the browser
// angular 
files = [
  'spec/javascripts/lib/angular-scenario.js',
  ANGULAR_SCENARIO_ADAPTER,
  'spec/javascripts/e2e/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

singleRun = false;

urlRoot = '_karma';

proxies = {
  '/': 'http://localhost:3000/'
};
