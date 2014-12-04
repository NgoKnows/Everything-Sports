"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/
var playerDict = getPlayerDict();
var playerList;
var dataListPlayers = getDataList();

angular.module('Fantasy', [])
    .controller('TeamController', function ($scope) {
        $scope.players = [];
        $scope.sortCat = 'POS';
        $scope.dataListPlayers = getDataList();
        $scope.statCats = ["POS", "G", "GS", "MP", "FG", "FGA", "FG%", "3P", "3PA", "3P%", "2P", "2PA",
                     "2P%", "FT", "FTA", "FT%", "ORB", "DRB", "TRB", "AST", "STL",
                     "BLK", "TOV", "PF", "PTS"];
        $scope.hiddenCats = ["2P", "2PA", "3P", "3PA", "3P%"];
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
        $scope.search = function () {
            if ($scope.dataListPlayers == undefined) {
                $scope.dataListPlayers == dataListPlayers;
            }
            console.log('hi');
        }
        $scope.addPlayer = function () {
            var player = [$("#playersearch").val()];
            var newPlayer = getPlayerList(player);
            if ($.inArray(player, playerList) == -1) {
                console.log('here');
                $scope.players.push(newPlayer[0]);
            }
        }
        $scope.getTotal = function (stat, index) {
            console.log(stat);
            if ($.inArray(stat, ["PG", "SG", "SF", "PF", "C"] == -1)) {
                $scope.totals[index] += parseFloat(stat);
            }
            return stat;
        }
        $scope.deletePlayer = function (player) {
            console.log(player);
            var indexOfPlayer = $.inArray(player, playerList)
            playerList.splice(indexOfPlayer, 1);

            $scope.players = playerList;
        }
        $scope.clearTeam = function () {
            console.log(dataListPlayers);
            console.log($scope.dataListPlayers);
            playerList = [];
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
                $scope.hiddenCats.splice(indexOfCat, 1);
            } else {
                $scope.hiddenCats.push(cat);
            }
        }
        $scope.isHidden = function (cat) {
            var indexOfCat = $.inArray(cat, $scope.hiddenCats);
            if (indexOfCat != -1) {
                return true;
            } else {
                return false;
            }

        }
        $scope.isHiddenTotal = function (index) {
            var cat = $scope.statCats[index + 1];
            var indexOfCat = $.inArray(cat, $scope.hiddenCats);
            if (indexOfCat != -1) {
                return true;
            } else {
                return false;
            }

        }
        $scope.hiddenStat = function (index) {
            var cat = $scope.statCats[index];
            if ($.inArray(cat, $scope.hiddenCats) != -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.empty = function () {
            //console.log($scope.players);
            if ($scope.players == undefined || $scope.players.length == 0) {
                return true;
            }
            return false;

        };


    })
    .controller("CompareController", function ($scope) {
        $scope.players = [];
        $scope.dataListPlayers = getDataList();
        $scope.addPlayer = function () {
            var player = [$("#playersearch").val()];
            var newPlayer = getPlayerList(player);
            if ($.inArray(player, playerList) == -1) {
                $scope.players.push(newPlayer[0]);
            }
            console.log($scope.players);
        }
        $scope.search = function () {
            if ($scope.dataListPlayers == undefined) {
                $scope.dataListPlayers == dataListPlayers;
            }
        }
        $scope.createGraph = function () {
            console.log('hi');
            var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);
            var x1 = d3.scale.ordinal();
            var y = d3.scale.linear()
                .range([height, 0]);
            var color = d3.scale.ordinal()
                .range(["#097054", "#6599FF", "#FFDE00", "#FF9900"]);
            var xAxis = d3.svg.axis()
                .scale(x0)
                .orient("bottom");
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
            console.log(d3.select("#dfadf"));
            console.log(d3.select("#graph"));

            var svg = d3.select("#gddsaph").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        }

    });
