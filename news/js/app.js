/*
	app.js, main Angular application script for the sports news
*/

"use strict";

angular.module('sports_news', [])
	.controller('ArticleController', function($scope) {
		console.log('here');
		//$scope.articles = find_articles(keywords, $scope);
		$scope.articles = get_articles();	
		console.log('here');
	});




function get_articles() {
	var articles = [];
    $.getJSON('../data/articles.json')
        .done(function (data) {
            data.forEach(function (article) {
            	article['hidden'] = true;
                articles.push(article);
            })
        });
    return articles;
}

function find_articles(keywords, $scope) {
	var articles = get_articles();
	$scope.articles.forEach(function(article) {
		keywords.forEach(function(search_word) {
			if (search_word in article['title'] || search_word in article['description'] || search_word in article['link'] || search_word in article['url']) {
				article['hidden'] = false;
				console.log('contains keyword, unhidden');
			}
		})
	});
	console.log(articles);
	return articles;
}
