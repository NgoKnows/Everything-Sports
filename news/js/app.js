/*
	app.js, main Angular application script for the sports news
*/

"use strict";

angular.module('SportsNews', [])
    .controller('ArticlesController', function ($scope, $http) {
        $http.get('../data/articles.json')
            .success(function (articles) {
                $scope.articles = articles;
            });
        $scope.filters = "";
        $scope.search_string = [];
        $scope.setSearch = function (filter) {
            $scope.filters = filter;
        }
        $scope.filter_by = function () {
            if ($scope.articles != undefined) {
                $scope.search_string = $scope.filters.split(' ');
                console.log($scope.search_string);
                //}
                $scope.search_string.forEach(function (word) {
                    console.log(word);
                    $scope.articles.forEach(function (article) {
                        console.log(article);
                        return true;
                        //return (article.title.toLowerCase().indexOf(word) > -1 || article.description.toLowerCase().indexOf(word) > -1 || article.link.toLowerCase().indexOf(word) > -1);
                    })
                });
            }
        }
    });
