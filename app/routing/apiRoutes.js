var friends = require("../data/friends");

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        var userData = req.body;
        var userScores = userData.scores;
        var scoreDifference;
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            scoreDifference = 0;

            console.log(currentFriend.name);

            //Scores per friend
            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                // We calculate the difference between the scores and sum them into the scoreDifference
                scoreDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }
            // If the sum of differences is less then the differences of the current "best match"
            if (scoreDifference <= bestMatch.friendDifference) {
                // Reset the bestMatch to be the new friend.
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = scoreDifference;
            }
        }

        friends.push(userData);

        // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
        res.json(bestMatch);
    });
};