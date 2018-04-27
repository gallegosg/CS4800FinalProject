var table = document.getElementById('table');
table.classList.add("table");
//get teams
getTeams = (year) => {
    url = 'https://api.mysportsfeeds.com/v1.2/pull/mlb/' + year + '-regular/overall_team_standings.json?sort=team.city.A'
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
		var RunsRow = document.createElement('td');
		var HomerunsRow = document.createElement('td');
		var HitsRow = document.createElement('td');
		var BattingAvgRow = document.createElement('td');


        //Add Data to Node
        var teamName = document.createTextNode(team.team.City + " " + team.team.Name);
		var Hits = document.createTextNode(team.stats.Hits['#text']);
		var Homeruns = document.createTextNode(team.stats.Homeruns['#text']);
		var Runs = document.createTextNode(team.stats.Runs['#text']);
		var BattingAvg = document.createTextNode(team.stats.BattingAvg['#text']);








        //Add Data to Row
        teamNameRow.appendChild(teamName);
		RunsRow.appendChild(Runs);
		HitsRow.appendChild(Hits);
		HomerunsRow.appendChild(Homeruns);
		BattingAvgRow.appendChild(BattingAvg);
		
		
		






        a.appendChild(teamName);
        teamNameRow.appendChild(a);
        a.href="players.html?team=" + team.team.ID;

        //Add Rows to Table
        tr.appendChild(teamNameRow);
		tr.appendChild(RunsRow);
		tr.appendChild(HitsRow);
		tr.appendChild(HomerunsRow);
		tr.appendChild(BattingAvgRow);

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







var RunsHeader = document.createElement('th');
var Runs = document.createTextNode('Runs');
RunsHeader.appendChild(Runs)
table.appendChild(Runs);

var HitsHeader = document.createElement('th');
var Hits = document.createTextNode('Hits');
HitsHeader.appendChild(Hits)
table.appendChild(Hits);

var HomerunsHeader = document.createElement('th');
var Homeruns = document.createTextNode('Homeruns');
HomerunsHeader.appendChild(Homeruns)
table.appendChild(Homeruns);

var BattingAvgHeader = document.createElement('th');
var BattingAvg = document.createTextNode('BattingAvg');
BattingAvgHeader.appendChild(BattingAvg)
table.appendChild(BattingAvg);

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