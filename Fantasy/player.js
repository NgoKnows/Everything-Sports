function getTeam() {
    var team = [];
    var playerString = $('#team').val().replace(/\,/g, ' ');
    console.log(playerString);
    var playerArray = playerString.split(/\s+/);
    for (var i = 0; i < playerArray.length - 1; i++) {
        if (playerArray[i].substring(playerArray[i].length - 1, playerArray[i].length) == '.' && playerArray[i + 1].substring(playerArray[i + 1].length - 1, playerArray[i + 1].length) == '.') {
            playerArray[i + 1] = playerArray[i].toUpperCase() + playerArray[i + 1].toUpperCase();
            i = i + 1;
        }

        var playerName = getPlayerName(playerArray[i], playerArray[i + 1]);
        console.log('player to be checked: ' + playerName);
        if (checkIfPlayer(playerName)) {
            team.push(playerName);
        }
    }
    playerList = getPlayerList(team);
    console.log(playerList);
};


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
    $.getJSON('../data/data.json')
        .done(function (data) {
            data.forEach(function (player) {
                playerDict1[player.name] = player.stats;
            })
        });
    return playerDict1;
}

function getPlayerList(playersOnTeam) {
    var playerList1 = [];
    playersOnTeam.forEach(function (player) {
        var curPlayer = {};
        var statCats = ["POS", "G", "GS", "MP", "FG", "FGA", "FG%", "3P", "3PA", "3P%", "2P", "2PA",
                     "2P%", "FT", "FTA", "FT%", "ORB", "DRB", "TRB", "AST", "STL",
                     "BLK", "TOV", "PF", "PTS"];
        var statistics = [];
        statCats.forEach(function (stat) {
            statistics.push(playerDict[player][stat]);
        })
        console.log(statistics);
        curPlayer.name = player;
        curPlayer.stats = statistics;
        curPlayer.pos = playerDict[player]['POS'];
        playerList1.push(curPlayer);
    })
    return playerList1;
}
