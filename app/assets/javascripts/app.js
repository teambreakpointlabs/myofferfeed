/* Modules */
var app = angular.module('myOfferFeed',['myOfferFeedDeps','ngCookies']);

var myOfferFeedDeps = angular.module('myOfferFeedDeps',['controllers', 'directives', 'services']);

var controllers = angular.module('controllers',['ui.bootstrap']);

var directives = angular.module('directives',[]);

var services = angular.module('services',['ngResource']);

