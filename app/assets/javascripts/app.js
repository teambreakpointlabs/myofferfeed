/* Modules */
var app = angular.module('myOfferFeed',['myOfferFeedDeps']);

var myOfferFeedDeps = angular.module('myOfferFeedDeps',['controllers', 'directives', 'services']);

var controllers = angular.module('controllers',[]);

var directives = angular.module('directives',[]);

var services = angular.module('services',['ngResource']);

