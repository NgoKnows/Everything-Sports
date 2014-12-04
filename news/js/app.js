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
                words.forEach(function(word) {
                    if (article.title.toLowerCase().indexOf(word) > -1 || article.description.toLowerCase().indexOf(word) > -1 || article.link.toLowerCase().indexOf(word) > -1) {
                        visible = true;
                    }
                    else {
                        visible = false;
                    }
                });
                return visible; // (words.indexOf(article.title.toLowerCase()) > -1)
            };
        
    });


// $scope.filters = "";
        // $scope.search_string = [];
        // $scope.setSearch = function(article, search_string) {
        //     $scope.search_string = search_string.split(' ');
        //     return (filter_by(article, $scope) > -1);

        // };



        // $scope.filter_by = function(article) {
        //     return (article.title.toLowerCase().indexOf($scope.search_string[0]) > -1);
        //     $scope.search_string.forEach(function(word) {
        //         return (article.title.toLowerCase().indexOf(word) > -1 || article.description.toLowerCase().indexOf(word) > -1 || article.link.toLowerCase().indexOf(word) > -1);
        //     });
        // };



// function filtered(article, search_string) {
//     console.log('here');
    
//     return (words.indexOf(article.title.toLowerCase()) > -1);
//     //return (article.title.toLowerCase().indexOf(search_string) > -1 || article.description.toLowerCase().indexOf(search_string) > -1 || article.link.toLowerCase().indexOf(search_string) > -1);
// }