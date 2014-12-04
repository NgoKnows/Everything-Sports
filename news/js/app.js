/*
	app.js, main Angular application script for the sports news
*/

"use strict";

angular.module('SportsNews', [])
    .controller('ArticlesController', function($scope, $http) {
        $http.get('../data/articles.json')
            .success(function(articles) {
                $scope.articles = articles;
                console.log('first');
            });
            $scope.filter_by = function(article, search_string) {
                console.log('here');
                var words = search_string.split(' ');
                var visible = true;
                console.log(words);
                words.forEach(function(term) {
                    if (article.title.toLowerCase().indexOf(term) > -1) {

                    }
                    else {
                        visible = false;
                    }
                });
                return visible; // (words.indexOf(article.title.toLowerCase()) > -1)
            };
        
    });
