"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

$(document).ready(function () {
    $('#submit').click(function () {
        var playerDict = getPlayerDict();
        var playerString = $('#team').val();
        var playerArray = playerString.split(/\s+/);
        for (var i = 0; i < playerArray.length - 1; i++) {
            var playerName = (playerArray[i] + " " + playerArray[i + 1]).toLowerCase();
            //console.log(playerName);
            //checkIfPlayer(playerName);
            /*if (checkIfPlayer(playerName) != false) {
                //console.log(playerName);*/
           // }
        }
        //checkIfPlayer('hi')
    });
});

function getPlayerDict(){
    var playerDict = {};
    $.getJSON('http://students.washington.edu/alexhngo/info343/Everything-Sports/data/players.json')
        .done(function (data) {
            data.forEach(function(player){
                playerDict[player.name] = player.stats;
                console.log(playerDict);
            })
        });
    console.log(playerDict);
    }
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
