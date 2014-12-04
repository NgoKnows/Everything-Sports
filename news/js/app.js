/*
	app.js, main Angular application script for the sports news
*/

"use strict";

angular.module('SportsNews', [])
    .controller('ArticlesController', function($scope, $http) {
        $http.get('../data/articles.json')
       		.success(function(articles) {                
           		$scope.articles = articles;
        });
       	$scope.search_string = 'espn';
    	$scope.filter_by = function(search_string) {
    		$scope.search_string = search_string.split(' ');
    		console.log($scope.search_string);
			$scope.search_string.forEach(function(word) {
				$scope.articles.forEach(function(article) {
					return (article.title.indexOf(word) > -1 || article.description.indexOf(word) > -1 || article.link.indexOf(word) > -1);
				})
			});
    	};
    });
