"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/
var playerDict = getPlayerDict();
var playerList;
var dataListPlayers = getDataList();
var statCats = ["POS", "G", "GS", "MP", "FG", "FGA", "FG%", "3P", "3PA", "3P%", "2P", "2PA", "2P%", "FT", "FTA", "FT%", "ORB", "DRB", "TRB", "AST", "STL", "BLK", "TOV", "PF", "PTS"];

angular.module('Fantasy', ['ngRoute', 'ngAnimate'])

.config(function ($routeProvider, $locationProvider) {

        $routeProvider

        // route for the home page
            .when('/', {
                templateUrl: 'Fantasy/home.html'
            })
            .when('/Fantasy/Team', {
                templateUrl: 'Fantasy/index.html'
            })
            //login page
            .when('/Fantasy/Compare', {
                templateUrl: 'Fantasy/playercompare.html'
            })
            .otherwise({
                redirectTo: '/'
            });
//            $locationProvider.html5Mode(true);

    })
    .controller('TeamController', function ($scope) {
        $scope.players = [];
        $scope.sortCat = 'POS';
        $scope.dataListPlayers = getDataList();
        $scope.statCats = ["POS", "G", "GS", "MP", "FG", "FGA", "FG%", "3P", "3PA", "3P%", "2P", "2PA",
                     "2P%", "FT", "FTA", "FT%", "ORB", "DRB", "TRB", "AST", "STL",
                     "BLK", "TOV", "PF", "PTS"];
        $scope.hiddenCats = ["2P", "2PA", "3P", "3PA", "3P%"];
        $scope.intialize = function () {
            $('#teamLink').addClass("active");
        }
        $scope.intialize();
        $scope.refreshPlayerList = function () {
            $scope.errorMessage = '';
            getTeam();
            $scope.players = playerList;
        };
        $scope.sortBy = function (sortCat) {
            if ($scope.sortCat == sortCat) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCat = sortCat;
                $scope.sortReverse = false;
            }
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
        }
        $scope.addPlayer = function () {
            var player = [getPlayerNameWhole($("#playersearch").val())];
            var newPlayer = getPlayerList(player);
            $scope.errorMessage = '';

            var playerNames = $scope.players.map(function(player){
                return player.name;
            });

            if(!newPlayer[0]){
                $scope.errorMessage = "There is no player with that name!"
            }else if(playerNames.indexOf(newPlayer[0].name)) {
                $scope.players.push(newPlayer[0]);
                   $scope.dataListPlayers.splice(dataListPlayers.indexOf(player[0]), 1);
                $("#playersearch").val("");
            }else{
                $scope.errorMessage = "That player is already on the team!"
                $("#playersearch").val("");
            }
        };
        $scope.getTotal = function (stat, index) {
            if ($.inArray(stat, ["PG", "SG", "SF", "PF", "C"] == -1)) {
                $scope.totals[index] += parseFloat(stat);
            }
            return stat;
        }
        $scope.deletePlayer = function (player) {
            var indexOfPlayer = $.inArray(player, $scope.players);
            $scope.players.splice(indexOfPlayer, 1);
            $scope.dataListPlayers.push(player.name);

        }
        $scope.clearTeam = function () {
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
            if ($scope.players == undefined || $scope.players.length == 0) {
                return true;
            }
            return false;

        };


    })
    .controller("CompareController", function ($scope) {
    $scope.test = false;
        $scope.players = [];
        $scope.dataListPlayers = getDataList();
        $scope.trackedCats = ["FG", "FGA", "FG%"];
        $scope.trackedNum = 0;
        $scope.groupBy = "stat";
        $scope.intialize = function () {
            $('#compareLink').addClass("active");
        }
        $scope.intialize();
        $scope.addPlayer = function () {
            var player = [getPlayerNameWhole($("#playersearch").val())];
            console.log("DSFDSF" + " " + player)
            var newPlayer = getPlayerList(player);
            $scope.errorMessage = '';

            var playerNames = $scope.players.map(function(player){
                return player.name;
            });

            if(!newPlayer[0]){
                $scope.errorMessage = "There is no player with that name!"
            }else if(playerNames.indexOf(newPlayer[0].name)) {
                $scope.players.push(newPlayer[0]);
                   $scope.dataListPlayers.splice(dataListPlayers.indexOf(player[0]), 1);
                    $("#playersearch").val("");
            }else{
                $scope.errorMessage = "That player is already being compared!"
                $("#playersearch").val("");
            }
        };
        $scope.search = function () {
            if ($scope.dataListPlayers === undefined) {
                $scope.dataListPlayers = dataListPlayers;
            }
        }
        $scope.empty = function () {
            if ($scope.players == undefined || $scope.players.length == 0) {
                return true;
            }
            return false;

        }
        $scope.deletePlayer = function (player) {
            var indexOfPlayer = $.inArray(player, playerList)
            $scope.players.splice(indexOfPlayer, 1);
            $scope.dataListPlayers.push(player.name);
        }
        $scope.getFormattedPlayers = function () {
            var data = [];
            $scope.players.forEach(function (player) {
                var formattedPlayer = {
                    name: player.name
                };
                var stats = [];
                player.stats.forEach(function (stat, index) {
                    if ($.inArray(statCats[index], $scope.trackedCats) != -1) {
                        formattedPlayer[statCats[index]] = stat;
                        stats.push({
                            name: statCats[index],
                            value: parseFloat(stat)
                        });
                        formattedPlayer.stats = stats;
                    }

                })
                data.push(formattedPlayer);
            });
            return data;
        }
        $scope.getFormattedStats = function () {

            var data = [];
            $scope.trackedCats.forEach(function (cat) {
                var formattedStat = {
                    name: cat,
                    stats: []
                };
                data.push(formattedStat);
            })
            $scope.players.forEach(function (player) {
                var i = 0;
                player.stats.forEach(function (stat, index) {
                    if ($.inArray(statCats[index], $scope.trackedCats) != -1) {
                        console.log(i);
                        data[i][player.name] = stat;
                        data[i].stats.push({
                            name: player.name,
                            value: parseFloat(stat)
                        });
                        i++;
                    }
                });
            })
            return data;

        }
        $scope.getComparedPlayers = function () {
            var playerString = "";
            $scope.players.forEach(function (player) {
                playerString += player.name;
                playerString += " vs. ";
            })
            return playerString.substring(0, playerString.length - 5);
        }
        $scope.setGroupBy = function (group) {
            $scope.groupBy = group;
        }
        $scope.setTrackedCats = function (num) {
            if (num == 0) {
                $scope.trackedCats = ['FG', 'FGA', "3P", "3PA", "FT", "FTA", "PTS"];
                $scope.trackedNum = 0;
            } else if (num == 1) {
                $scope.trackedCats = ['TRB', 'AST', 'PTS'];
                $scope.trackedNum = 1;
            } else if (num == 2) {
                $scope.trackedCats = ['BLK', 'STL'];
                $scope.trackedNum = 2;
            } else {
                $scope.trackedCats = ["FG%", "2P%", "3P%", "FT%"];
                $scope.trackedNum = 3;
            }

        }
        $scope.createGraph = function () {
            d3.select("svg")
                .remove();
            if ($scope.groupBy == "stat") {
                var data = $scope.getFormattedStats();
            } else {
                var data = $scope.getFormattedPlayers();
            }
            console.log(data);
            var margin = {
                    top: 50,
                    right: 20,
                    bottom: 50,
                    left: 60
                },
                width = 1500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);
            var x1 = d3.scale.ordinal();
            var y = d3.scale.linear()
                .range([height, 0]);
            var color = d3.scale.ordinal()
                .range(_.shuffle(["#F0A3FF", "#0075DC", "#FFA405", "#4C005C", "#FF0010", "#8F7C00", "#990000", "#2BCE48", "#FFCC99",
                        "#808080", "#5EF1F2", "#9DCC00", "#ffed6f", "#00998F", "#003380", "#94FFB5", "#fb9a99", "#FF5005",
                        "#005C31", "#b15928", "#426600", "#FFA8BB", "#191919", "#E6E62E", "#C20088", "#740AFF"]));
            var xAxis = d3.svg.axis()
                .scale(x0)
                .orient("bottom");
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var svg = d3.select("#graph").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + (parseInt(margin.top) + 1) + ")");

            var catNames = d3.keys(data[0]).filter(function (key) {
                return key !== "name" && key != "stats";
            });

            x0.domain(data.map(function (a) {
                return a.name;
            }));
            x1.domain(catNames).rangeRoundBands([0, x0.rangeBand()]);
            y.domain([0, d3.max(data, function (a) {
                return d3.max(a.stats, function (a) {
                    return a.value;
                });
            })]);
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end");

            if ($scope.players.length < 5) {
                svg.append("text")
                    .attr("x", (width / 2) - $scope.players.length * (width / 10))
                    .attr("y", 0 - (margin.top / 2))
                    .style("font-size", "24px")
                    .style("font-weight", "bold")
                    .style("text-decoration", "underline")
                    .text($scope.getComparedPlayers());
            }

            var players = svg.selectAll(".name")
                .data(data)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function (a) {
                    return "translate(" + x0(a.name) + ",0)";
                });

            players.selectAll("rect")
                .data(function (a) {
                    return a.stats;
                })
                .enter().append("rect")
                .attr("width", x1.rangeBand())
                .attr("x", function (a) {
                    return x1(a.name);
                })
                .attr("y", function (a) {
                    return y(a.value);
                })
                .attr("height", function (a) {
                    return height - y(a.value);
                })
                .style("fill", function (a) {
                    return color(a.name);
                });

            var legend = svg.selectAll(".legend")
                .data(catNames.slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (a, i) {
                    return "translate(0," + i * 22 + ")";
                });

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 20)
                .attr("height", 20)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 36)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .style("font-size", "20px")
                .text(function (a) {
                    return a;
                });
            $scope.hoverPlayer();
        };
        $scope.hoverPlayer = function () {
            var players = $('.legend');
            var color;
            angular.forEach(players, function (player) {
                var text = $(player.children[1]);
                console.log(text);
                color = (player.children[0].attributes.style.value.substring(6));
                color = color.substr(0, color.length - 1)
                var matchedRect = $('rect').filter(function () {
                    return $(this).css('fill') == color;
                });
                matchedRect.hover(function () {
                    if($(matchedRect[0]).attr('opacity') == 0.6){
                        matchedRect.attr('opacity', 1);
                        text.css("font-weight", "normal")
                    }else{
                        matchedRect.attr('opacity', 0.6);
                        text.css("font-weight", "bold")
                    }
                });
                text.hover(function () {
                    console.log(text);
                    if($(matchedRect[0]).attr('opacity') == 0.6){
                        matchedRect.attr('opacity', 1);
                        $(this).css("font-weight", "normal")
                    }else{
                        matchedRect.attr('opacity', 0.6);
                        $(this).css("font-weight", "bold")
                    }
                });
            });
        };
        $scope.$on("$destroy", function(){
            $('#graph').empty();
        });
    })
    .controller("HomeController", function ($scope) {
        $scope.intialize = function () {
            $('#homeLink').addClass("active");
        }
        $scope.intialize();
    });
