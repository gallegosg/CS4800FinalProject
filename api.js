//get teams
getTeams = (year) => {
    url = 'https://api.mysportsfeeds.com/v1.2/pull/nfl/' + year + '-regular/overall_team_standings.json'
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
            //json comes out here
            console.log(json)
        });
}