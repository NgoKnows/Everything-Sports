/*
	app.js, main Angular application script for the sports news
*/

"use strict";

angular.module('SportsNews', [])
    .controller('ArticlesController', function($scope, $http) {
        $.getJSON('../data/articles.json')
	        .done(function(data) {
	            $scope.articles = JSON.parse(data);
	            console.log($scope.articles.length)
	            console.log($scope.articles);
	        });
    });

// function get_articles($scope) {
//     var articles = [];
//     $.get('../data/articles.json')
//         .done(function(data) {
//         	data = JSON.parse(data);
//             data.forEach(function(article) {
//             	article['hidden'] = false;
//                 articles.push();
//                 //console.log(articles[0]);
//             });
//             $scope.articles = data;
//         });
// }

// function find_articles(keywords, $scope) {
// 	$scope.articles.forEach(function(article) {
// 		keywords.forEach(function(search_word) {
// 			if (search_word in article['title'] || search_word in article['description'] || search_word in article['link'] || search_word in article['url']) {
// 				article['hidden'] = false;
// 				console.log('contains keyword, unhidden');
// 			}
//             else {
//                 article['hidden'] = true;
//             }
// 		})
// 	});
// 	// console.log(articles);
// 	return articles;
// }
