"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/
var playerDict = getPlayerDict();
var playerList;

angular.module('FantasyTeam', [])
    .controller('TeamController', function ($scope) {
        $scope.players = playerList;
        $scope.sortCat = 'POS';

        $scope.statCats = ["POS", "G", "GS", "MP", "FG", "FGA", "FG%", "3P", "3PA", "3P%", "2P", "2PA",
                     "2P%", "FT", "FTA", "FT%", "ORB", "DRB", "TRB", "AST", "STL",
                     "BLK", "TOV", "PF", "PTS"];
        $scope.hiddenCats = ["2P", "2PA", "3P", "3PA"];
        $scope.refreshPlayerList = function () {
            getTeam();
            $scope.players = playerList;
        };
        $scope.sortBy = function (sortCat) {
            console.log(sortCat);
            if ($scope.sortCat == sortCat) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCat = sortCat;
                $scope.sortReverse = false;
            }
            console.log($scope.sortCat);
        }
        $scope.hoverOverCol = function () {
            $scope.curCol = this.$index;
        }
        $scope.hoverOverRow = function () {
            $scope.curRow = this.$index;
        }
        $scope.deletePlayer = function () {
            playerList.splice(this.$index, this.$index + 1);
            $scope.players = playerList;
        }
        $scope.getSortedValue = function (player) {
            if ($scope.players) {
                if ($scope.sortCat == "POS") {
                    return $.inArray(player.pos, ["C", "PF", "SF", "SG", "PG"]);
                } else {
                    var indexOfCat = $.inArray($scope.sortCat, $scope.statCats);
                    return parseFloat(player.stats[indexOfCat]);
                }
            }
        }
        $scope.toggleHide = function (cat) {
            var indexOfCat = $.inArray(cat, $scope.hiddenCats);
            if (indexOfCat != -1) {
                $scope.hiddenCats.splice(indexOfCat, indexOfCat + 1);
            } else {
                $scope.hiddenCats.push(cat);
            }
        }
        $scope.isHidden = function (cat) {
            var indexOfCat = $.inArray(cat, $scope.hiddenCats);
            if (indexOfCat != -1) {
                console.log(true);
                return true;
            } else {
                console.log(false);
                return false;
            }

        }
        $scope.hiddenStat = function(index){
            var cat = $scope.statCats[index];
            if($.inArray(cat, $scope.hiddenCats) != -1){
                return true;
            }else{
                return false;
            }
        };

    });
