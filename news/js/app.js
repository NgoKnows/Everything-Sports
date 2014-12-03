/*
	app.js, main Angular application script for the sports news
*/

"use strict";

angular.module('SportsNews', [])
	.controller('ArticleController', function($scope) {
        $scope.articles = get_articles();
        console.log(articles[0]);
        console.log('here');
        
        // $scope.sort_articals = function(searchString) {
        //     var keywords = keyword_string.split(' ');
        //     $scope.articals = find_articles(keywords, $scope);
        // };
		// console.log('here');
	});

function get_articles() {
    var articles = [];
    $.getJSON('../data/articles.json')
        .done(function(data) {
        	data = JSON.parse(data);
            data.forEach(function(article) {
            	article['hidden'] = false;
                articles.push(article);
                console.log(article);
            });
           // console.log(articles[2]);
        });
    return articles;
    //return articles;
}

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
