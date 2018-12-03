// Requirements
require("dotenv").config();
var axios = require("axios")
var moment = require('moment');

// Spotify requirements
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


// liri node commands 
var command = process.argv[2];
var queryThis = process.argv[3];
// Movie request
var movieThis = function (movieQuery) {
    var divider = "\n------------------------------------------------------------\n\n";
    console.log(divider);

    // If user doesnt select, default to Mr. Robot
    if (movieQuery === undefined) {
        movieQuery = "mr nobody";
    }

    // GET request
    var URL = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";

    axios.get(URL).then(function (response) {
        var movieData = response.data;

        var showData = [
            "Title: " + movieData.Title,
            "Year: " + movieData.Year,
            "IMDB Rating: " + movieData.Rated,
            "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value,
            "Country: " + movieData.Country,
            "Language: " + movieData.Language,
            "Plot: " + movieData.Plot,
            "Actors: " + movieData.Actors
        ].join("\n\n")
        console.log(showData);
    })
}

// Spotify This
var spotifyThis = function () {
    var divider = "\n------------------------------------------------------------\n\n";
    console.log(divider);
    var query = process.argv[3]
    if (query === undefined) {
        query = "The Sign by Ace of Base";
    }
    spotify.search({ type: 'track', query }, function (err, response, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var showData = [
            "Artist Name: " + response.tracks.items[0].artists[0].name,
            "Song Name: " + response.tracks.items[0].name,
            "Album Name: " + response.tracks.items[0].album.name
        ].join("\n\n")

        if (queryThis === undefined) {
            queryThis === "The Sign by Ace of Base";
        }
        console.log(showData);
        // console.log(response.tracks.items[0].artists);
    });
};

// Concert thus 
var concertThis = function (artistQuery) {
    var divider = "\n------------------------------------------------------------\n\n";
    console.log(divider);

    // GET request
    var URL = "https://rest.bandsintown.com/artists/" + artistQuery + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
        // If user doesnt select, default to Mr. Robot
        if (artistQuery === undefined) {
            artistQuery = "Kanye West";
            console.log("Since you counldn't choose an concert, I picked Kanye West for you.")
        }
        var concertData = response.data[0].venue;
        var showData = [
            "Venue: " + concertData.name,
            "City: " + concertData.city,
            "date: " + moment(response.data[0].datetime).format("MM/DD/YYYY")
        ].join("\n\n")
        console.log(showData);
    })


}
// app functionality by user input 
if (command === "movie-this") {
    movieThis(queryThis);
} else if (command === "spotify-this-song") {
    spotifyThis(queryThis);
} else if (command === "concert-this") {
    concertThis(queryThis);
} else if (command === "do-what-it-says") {
    var fs = require("fs")

    fs.readFile("random.txt", "utf-8", function (error, data) {
        var command;
        var queryThis;

        if (data.indexOf(",") !== -1) {
            var dataArr = data.split(",");
            command = dataArr[0];
            queryThis = dataArr[1];
        } else {
            command = data;
        }

        if (command == "movie-this") {
            movieThis();
        } else if (command === "spotify-song-this") {
            spotifyThis(queryThis);
        } else if (command === "concert-this") {
            concertThis(queryThis);
        } 
    });
} else if (command === undefined) {
    console.log("Please eneter a command to start using LIRI.");
} else {
    console.log("Command not recognized, please try again.")
}