"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/
var playerDict = getPlayerDict();

$(document).ready(function () {
    $('#submit').click(function () {
        var team = [];
        var playerString = $('#team').val();
        var playerArray = playerString.split(/\s+/);
        for (var i = 0; i < playerArray.length - 1; i++) {
            if(playerArray[i].substring(playerArray[i].length - 1, playerArray[i].length) == '.'
               && playerArray[i+1].substring(playerArray[i+1].length - 1, playerArray[i+1].length) == '.'){
                playerArray[i+1] = playerArray[i].toUpperCase() + playerArray[i+1].toUpperCase();
                i = i+1;
            }

            var playerName = getPlayerName(playerArray[i], playerArray[i+1]);
            console.log('player to be checked: ' + playerName);
            if (checkIfPlayer(playerName)) {
                team.append(playerName);
            }
        }
        console.log(team);
    });
});

function getPlayerName(firstName, lastName) {
    var playerFirstName = firstName.substring(0, 1).toUpperCase() +
        firstName.substring(1, firstName.length);
    var playerLastName = lastName.substring(0, 1).toUpperCase() +
        lastName.substring(1, lastName.length).toLowerCase();
    var playerName = playerFirstName + ' ' + playerLastName;
    return playerName;
}

function checkIfPlayer(playerName) {
    console.log(playerDict.hasOwnProperty(playerName));
    if (playerDict.hasOwnProperty(playerName)) {
        return true;
    }
    return false;
}

function getPlayerDict() {
    var playerDict1 = {};
    $.getJSON('http://students.washington.edu/alexhngo/info343/Everything-Sports/data/players.json')
        .done(function (data) {
            data.forEach(function (player) {
                playerDict1[player.name] = player.stats;
            })
        });
    return playerDict1;
}

/*function getPlayerDict1() {
    var playerDict = {};
    $.ajax({
        url: 'http://students.washington.edu/alexhngo/info343/Everything-Sports/data/players.json',
        dataType: 'json',
        success: function (response) {
            console.log('success!');
        }
    })
}*/
//console.log(playerName);

/*var playerNameArray = playerName.split(" ");
    var urlToCheck = 'http://www.basketball-reference.com/players/' + playerNameArray[1].charAt(0) + '/' +
        playerNameArray[1].substring(0, 5) + playerNameArray[0].substring(0, 2) + '01.html';
    return $.ajax({
        url: urlToCheck,
        crossDomain: true,
        dataType: 'jsonp',
        success: function (json) {
           //console.log('success!');

            /*var elements = $("<h1>").html(data)[0];
            for (var i = 0; i < elements.length; i++) {
                var theText = elements[i];
                console.log(theText);
                    // Do something here
            }
        },
        error: function (err) {
            //console.log('404 error');
            return false;
        }
    })
};*/
