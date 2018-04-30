var table = document.getElementById('table');
table.classList.add("table");
//get teams
getTeams = (year) => {
    url = 'https://api.mysportsfeeds.com/v1.2/pull/nba/' + year + '-playoff/overall_team_standings.json?sort=team.city.A'
    var teamArray = [];
    fetch(url, {
        headers: {
            'Authorization': 'Basic '+btoa('ggallegos:software'), 
          }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            var unModdedTeamArray = json.overallteamstandings.teamstandingsentry
            unModdedTeamArray.forEach(function(obj) { 
                teamArray.push(obj)
            });
            showTeams(teamArray);
        });
}

//show teams function
showTeams = (arr) => {
    for (var i = 0; i < arr.length; i++){
        var team = arr[i];
        var tr = document.createElement('tr');   
        var td1 = document.createElement('td');
        var a = document.createElement('a');

        var teamNameRow = document.createElement('td');
        var Fg2PtAttRow = document.createElement('td');
        var FtAttPerGameRow = document.createElement('td');
        var OffRebRow = document.createElement('td');
        var AstRow = document.createElement('td');
        var TovPerGameRow = document.createElement('td');
        var FoulsRow = document.createElement('td');
        var WinsRow = document.createElement('td');
        var LossesRow = document.createElement('td');

        //Add Data to Node
        var teamName = document.createTextNode(team.team.City + " " + team.team.Name);
        var Fg2PtAtt = document.createTextNode(team.stats.Fg2PtAtt['#text']);
        var FtAttPerGame = document.createTextNode(team.stats.FtAttPerGame['#text']);
        var OffReb = document.createTextNode(team.stats.OffReb['#text']);
        var Ast = document.createTextNode(team.stats.Ast['#text']);
        var TovPerGame = document.createTextNode(team.stats.TovPerGame['#text']);
        var Fouls = document.createTextNode(team.stats.Fouls['#text']);
        var Wins = document.createTextNode(team.stats.Wins['#text']);
        var Losses = document.createTextNode(team.stats.Losses['#text']);


        //Add Data to Row
        teamNameRow.appendChild(teamName);
        Fg2PtAttRow.appendChild(Fg2PtAtt);
        FtAttPerGameRow.appendChild(FtAttPerGame);
        OffRebRow.appendChild(OffReb);
        AstRow.appendChild(Ast);
        TovPerGameRow.appendChild(TovPerGame);
        FoulsRow.appendChild(Fouls);
        WinsRow.appendChild(Wins);
        LossesRow.appendChild(Losses);






        a.appendChild(teamName);
        teamNameRow.appendChild(a);
        a.href="players.html?team=" + team.team.ID;

        //Add Rows to Table
        tr.appendChild(teamNameRow);
        tr.appendChild(Fg2PtAttRow);
        tr.appendChild(FtAttPerGameRow);
        tr.appendChild(OffRebRow);
        tr.appendChild(AstRow);
        tr.appendChild(TovPerGameRow);
        tr.appendChild(FoulsRow);
        tr.appendChild(WinsRow);
        tr.appendChild(LossesRow);
 


        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

/**
 * draw the table headers
 */
drawTableHeaders = () => {
    var nameHeader = document.createElement('th');
    var name = document.createTextNode('Name');
    nameHeader.appendChild(name)
    table.appendChild(nameHeader);

  var Fg2PtAttHeader = document.createElement('th');
    var Fg2PtAtt = document.createTextNode('FG2PtAtt');
    Fg2PtAttHeader.appendChild(Fg2PtAtt)
    table.appendChild(Fg2PtAttHeader);

var FtAttPerGameHeader = document.createElement('th');
    var FtAttPerGame = document.createTextNode('FtAttPerGame');
   FtAttPerGameHeader.appendChild(FtAttPerGame)
    table.appendChild(FtAttPerGameHeader);


   var OffRebHeader = document.createElement('th');
    var OffReb = document.createTextNode('OffReb');
    OffRebHeader.appendChild(OffReb)
    table.appendChild(OffRebHeader);

    var AstHeader = document.createElement('th');
    var Ast = document.createTextNode('Ast');
    AstHeader.appendChild(Ast)
    table.appendChild(AstHeader);

    var TovPerGameHeader = document.createElement('th');
    var TovPerGame = document.createTextNode('TovPerGame');
    TovPerGameHeader.appendChild(TovPerGame)
    table.appendChild(TovPerGameHeader);

    var FoulsHeader = document.createElement('th');
    var Fouls = document.createTextNode('Fouls');
    FoulsHeader.appendChild(Fouls)
    table.appendChild(FoulsHeader);

var WinsHeader = document.createElement('th');
    var Wins = document.createTextNode('Wins');
    WinsHeader.appendChild(Wins)
    table.appendChild(WinsHeader);

var LossesHeader = document.createElement('th');
    var Losses = document.createTextNode('Losses');
    LossesHeader.appendChild(Losses)
    table.appendChild(LossesHeader);

}

function yearChange() {
    var year = document.getElementById("dropdown").value;
    
    while(table.hasChildNodes())
    {
       table.removeChild(table.firstChild);
    }
    getTeams(year);
    drawTableHeaders();
    //getPlayerInfo(year);
}

drawTableHeaders();
getTeams(2017);