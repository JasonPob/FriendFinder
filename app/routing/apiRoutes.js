// Displays all friends
app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

// Displays a single friend, or returns false
app.get("/api/friends/:friends", function (req, res) {
    var chosen = req.params.friends;

    console.log(chosen);

    for (var i = 0; i < friends.length; i++) {
        if (chosen === friends[i].routeName) {
            return res.json(friends[i]);
        }
    }

    return res.json(false);
});
