const friendsData = require("../data/friends");

// ROUTING
module.exports = function (app) {

    // API GET Requests
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    app.post("/api/friends", function (req, res) {

        let newSurvey = req.body; 
        let currentLowScore = Number.MAX_SAFE_INTEGER; 
        let bestMatch = null; 

        friendsData.forEach((friend) => {  
            let scoreTotal = 0; 
            friend.scores.forEach((score, index) => { 
                scoreTotal += Math.abs(score - newSurvey.scores[index]); 
            })
            if (scoreTotal < currentLowScore) { 
                currentLowScore = scoreTotal;
                bestMatch = friend; 
            }
        })
        friendsData.push(newSurvey); 
        res.json(newSurvey);
    });
};