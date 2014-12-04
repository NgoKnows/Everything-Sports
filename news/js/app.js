/*
	app.js, main Angular application script for the sports news
*/

"use strict";

angular.module('SportsNews', [])
    .controller('ArticlesController', function($scope, $http) {
        $http.get('../data/articles.json')
            .success(function (articles) {
                $scope.articles = articles;
            });
        $scope.filters = "";
        $scope.search_string = [];
        $scope.setSearch = function(search_string) {
            $scope.search_string = search_string.split(' ');
        };

        $scope.filter_by = function() {
            $scope.search_string.forEach(function(word) {
                return (article.title.toLowerCase().indexOf(word) > -1 || article.description.toLowerCase().indexOf(word) > -1 || article.link.toLowerCase().indexOf(word) > -1);
            });
        };
    });
