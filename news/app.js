/*
	app.js, main Angular application script for the sports news
*/

"use strict";

angular.module('sports_news', ['ui.bootstrap'])
	.config(function($http_provider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'Lpi7BkWiEtAHRjlc3rofafI3C0UGsCDgf1WWeCjX';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'X1QNW3oDTkZeQDf9jt9ZPEUIZ1XdEO34XDYTcItx';
	})
	.controller('TaskController', function($scope, $http) {
		$scope.articles = get_articles();
	})

function get_articles() {
	
}