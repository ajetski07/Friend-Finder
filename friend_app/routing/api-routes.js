var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            friendDiff: 1000
        };

        // Now we will take the result of the user survey and parse it //

        var userData = req.body;
        var userScores = userData.scores;

        var totalDiff = 0;

        // Now we will make a loop to go through the friend possiblities based on the answers //

        for (var f = 0; f < friends.length; f++) {

            console.log(friends[f].name);
            totalDiff = 0;

            // Looping through all the scores of the friends //
            for (var s = 0; s < friends[f].scores[s]; s++) {
                
                // Calculating the difference between the scores to figure out the total difference //
                totalDiff += Math.abs(parseInt(userScores[s])) - parseInt(friends[f].scores[s]);

                // If the sum of the difference is less than the difference of the current best match //

                if (totalDiff <= bestMatch.friendDiff) {

                    // Reset the var bestMatch to show the friend from the list that best matches //
                    bestMatch.name = friends[f].name;
                    bestMatch.friendDiff = totalDiff;
                };

            };
        };

        // Now we save the user data to the database //
        friends.push(userData);

        // Return a JSON with the users best match //
        res.json(bestMatch);

    });
};