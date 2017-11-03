
var app = angular.module('projectMatrix', ['ngRoute','ui.bootstrap','ngAnimate','ngSanitize']);

app.config(function($routeProvider, $locationProvider, $httpProvider){

	$routeProvider
	.when('/login' , {
		templateUrl : 'Login.html',
		controller  :  'LoginController'
	}) 
	.when('/admin' , {
		templateUrl : 'AdminView.html',
		controller  : 'AdminViewController'
	}) 
	.when('/user' , {
		templateUrl : 'UserView.html',
		controller  : 'UserViewController'
	});
});