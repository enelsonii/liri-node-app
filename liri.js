// Requirements
require("dotenv").config();
var moment = require('moment');

// Spotify requirements
// var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify({
//     id: keys.spotify.id,
//     secret: keys.spotify.secret
// });

// liri node commands 
var command = process.argv[2];
var query = process.argv[3];
// Movie request
var movieThis = function (movieQuery) {
    // npm module
    var request = require("request");

    // If user doesnt select, default to Mr. Robot
    if (movieQuery === undefined) {
        movieQuery = "mr nobody";
    }

    // GET request
    request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(" Title: " + JSON.parse(body).Title);
            console.log(" Year: " + JSON.parse(body).Year);
            console.log(" IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log(" Country: " + JSON.parse(body).Country);
            console.log(" Language: " + JSON.parse(body).Language);
            console.log(" Plot: " + JSON.parse(body).Plot);
            console.log(" Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).value);
            // create a for loop to look though object to find Rotten Tomatoes rating
            // if the Rotten Tomatoes rating is found, print widow 
            // for (var i = 0; JSON.parse(body).Ratings.length; i++) {
            //     

            // }
        }
    })
}

// // Spotify request
// var spotifyThis = function (songName) {
//     // spotify package
//     var spotify = require("node-spotify-api");

//     // if user doesnt make a selection default, "The Sign"
//     if (songName  === undefined) {
//         songName = "The Sign By Ace of Base"
//     }

//     // Spotitfy API request, if a object is fond then it will return the first artist, song, preview link and album
//     spotify.search({type: 'track', query: songName, limit: 10}, function (err, data) {
//         if (error) {
//             return console.log("ERROR: " + err);
//         } else {

//             // create a for loop for when a song has multiple artists
//             for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
//                 if (i === 0) {
//                     console.log("Artist: " + data.track.items[0].artists[i].name);
//                 } else {
//                     console.log("  " + data.tracks.items[0].artists[i].name)
//                 }
//             }

//             console.log("Song:         " + data.tracks.items[0].name);
//             console.log("Preview Link: " + data.tracks.items[0].preview_url);
//             console.log("Album:        " + data.tracks.items[0].album.name);
//         }
//     });
// }

// Concert thus 
var concertThis = function (artistQuery) {
    // npm module
    var request = require("request");

    // If user doesnt select, default to Mr. Robot
    if (artistQuery === undefined) {
        artistQuery = "Kanye West";
    }

    // GET request
    request("https://rest.bandsintown.com/artists/" + artistQuery + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // test
            // console.log(response);
            var result = JSON.parse(body)[0];
            console.log(" Venue Name: " + result.venue.name);
            console.log(" Venue Location: " + result.venue.city);
            console.log(" Event Date: " + moment(result.date).format("MM/DD/YYYY"));
        }
    })
}
// app functionality by user input 
if (command === "movie-this") {
    movieThis(query);
// } else if (command === "spotify-this-song") {
//     spotifyThis(query);
} else if (command === "concert-this") {
    concertThis(query);
} else if (command === "do-what-it-says") {
    var fs = require("fs")
    

}