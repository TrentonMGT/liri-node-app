const keys = require('./keys.js');

const Twitter = require('twitter');

const spotify = require('spotify');

const request = require("request");

const fs = require('fs');

const client = new Twitter(keys);

var song = function() {

    var music = process.argv[3];
    spotify.search({ type: 'track', limits: 1, query: music },
        function(err, data) {

            console.log(data.tracks.items[0].album.artists[0].name);
            var songTracks = data.tracks.items[0];
            console.log(songTracks.name);
            console.log(songTracks.album.name);
            console.log(songTracks.preview_url);
            // console.log(songTracks.artists.name);

            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            // Do something with 'data' 
        });
}

var tweet = function() {
    var params = {
        screen_name: 'TrentMcleod10',
        count: 20
    };
    client.get('statuses/user_timeline', params,
        function(error, tweets, response) {
            if (!error) {
                console.log(tweets);

                var readText = tweets.statuses;
                for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].text);
                }
            }
        });
}

var post = function() {
    var postParams = {
        // Grab the status which will always be the third node argument.
        status: process.argv[3]
    };
    client.post('statuses/update', postParams,
        function(error, tweet, response) {
            if (!error) {
                console.log(tweet);
            }
        });
}


var movie = function(movieName) {
    // Grab the movieName which will always be the third node argument.
    var movieName = process.argv[2];
    // Then run a request to the OMDB API with the movie specified

    // movieName = "Gladiator"
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover the data
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("imdbRating: " + JSON.parse(body).imbdRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1]);
        }
    });
}

var liri = function() {
        fs.readFile("random.txt", "utf8", function(error, data) {

            // We will then print the contents of data
            console.log(data);

             song(data);

        });
    }

switch (process.argv[2]) {
    case 'my-tweets':
        tweet();
        break;
    case "spotify-this-song":
        song();
        break;
    case 'my-tweets':
        tweet();
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        liri();
        break;
    default:
        console.log("Darn You Broke it!");
}
