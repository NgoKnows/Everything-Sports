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
                var words;
                if (search_string) {
                    words = search_string.toLowerCase().split(' ');
                }
                else {
                    words = [''];
                }
                var visible = false;
                console.log(words);
                words.forEach(function(word) {
                    if (article.title.toLowerCase().indexOf(word) > -1 || article.description.toLowerCase().indexOf(word) > -1 || article.link.toLowerCase().indexOf(word) > -1 || article.creator.toLowerCase().indexOf(word) > -1 || article.date.toLowerCase().indexOf(word) > -1 || article.url.toLowerCase().indexOf(word) > -1) {
                        console.log("owdbwaiodb");
                        visible = true;
                    }
                });
                return visible;
            };
    });
