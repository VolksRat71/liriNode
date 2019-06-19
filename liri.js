// application first request's for .gitignored'd .env folder
require("dotenv").config();

// application required packages before running
const request = require("request");
const fs = require("fs");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

// capture terminal command line values
var userCommand = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

// case execution controller
function userValue() {
    switch (userCommand) {
        case `concert-this`:
            concertDisplay();
            break;

        case `spotify-this-song`:
            songDisplay();
            break;

        case `movie-this`:
            movieDisplay();
            break;

        case `do-what-it-says`:
            doWhatDisplay();
            break;

        default:
            console.warn("|            *please enter valid command*           |")
            console.log("|---------------------------------------------------|");
            break;
    }
}

userValue();

// case exicution functions
//`concert-this` case, simple user term insert into Url
function concertDisplay() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                //displayed on terminal
                console.log("|============> Start Event Information <============|");
                console.log(" Concerts searched for " + userInput);
                console.log(" Venue Location: " + concerts[i].venue.city);
                console.log(" Name of the Venue: " + concerts[i].venue.name);
                console.log(" Date of the Event: " + concerts[i].datetime);
                console.log("|=============> End Event Information <=============|");
                //sent to log.txt
                fs.appendFileSync("log.txt", "|============> Start Event Information <============|\n");
                fs.appendFileSync("log.txt", " Concerts searched for " + userInput +"\n");
                fs.appendFileSync("log.txt", " Name of the Venue: " + concerts[i].venue.name + "\n");
                fs.appendFileSync("log.txt", " Venue Location: " +  concerts[i].venue.city + "\n");
                fs.appendFileSync("log.txt", " Date of the Event: " +  concerts[i].datetime + "\n");
                fs.appendFileSync("log.txt", "|=============> End Event Information <=============|\n");

            }
        } else {
            console.warn("|                 *an error occured*                |")
            console.log("|---------------------------------------------------|");
        };
    });
}


// call spotify with i.d & secret, hidden from git.
function songDisplay() {
    if (userInput === undefined) {
        userInput = "Lori Meyers"; //default Song
    }
    spotify.search({
            type: "track",
            query: userInput
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            };
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                //displayed on terminal
                console.log("|==============> Start Song Information <==============|");
                console.log(" Song information searched for " + userInput);
                console.log(" Song name: " + songs[i].name);
                console.log(" Preview song: " + songs[i].preview_url);
                console.log(" Album: " + songs[i].album.name);
                console.log(" Artist(s): " + songs[i].artists[0].name);
                console.log("|===============> End Song Information <===============|");
                //sent to log.txt
                fs.appendFileSync("log.txt", "|==============> Start Song Information <==============|\n");
                fs.appendFileSync("log.txt", " Song information searched for " + userInput + "\n");
                fs.appendFileSync("log.txt", " Song name: " + songs[i].name + "\n");
                fs.appendFileSync("log.txt", " Preview song: " + songs[i].preview_url + "\n");
                fs.appendFileSync("log.txt", " Album: " + songs[i].album.name + "\n");
                fs.appendFileSync("log.txt", " Album: " + songs[i].album.name + "\n");
                fs.appendFileSync("log.txt", "|===============> End Song Information <===============|\n");
            }
        })
};

// axios call to OMDB
function movieDisplay() {
    if (userInput === "") {
        userInput = "Mr. Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=b3c0b435";
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var movies = JSON.parse(body);
            //displayed on terminal
            console.log("|=============> Start Movie Information <=============|");
            console.log(" Movie search for " + userInput);
            console.log(" Title: " + movies.Title);
            console.log(" IMDB Rating: " + movies.imdbRating);
            console.log(" Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
            console.log(" Country of Production: " + movies.Country);
            console.log(" Language: " + movies.Language);
            console.log(" Plot: " + movies.Plot);
            console.log(" Actors: " + movies.Actors);
            console.log("|==============> End Movie Information <==============|");
            //sent to log.txt
            fs.appendFileSync("log.txt", "|=============> Start Movie Information <=============|\n");
            fs.appendFileSync("log.txt", " Movie search for " + userInput + "\n");
            fs.appendFileSync("log.txt", " Title: " + movies.Title + "\n");
            fs.appendFileSync("log.txt", " IMDB Rating: " + movies.imdbRating + "\n");
            fs.appendFileSync("log.txt", " Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies)+ "\n");
            fs.appendFileSync("log.txt", " Country of Production: " + movies.Country + "\n");
            fs.appendFileSync("log.txt", " Language: " + movies.Language + "\n");
            fs.appendFileSync("log.txt", " Plot: " + movies.Plot + "\n");
            fs.appendFileSync("log.txt", " Actors: " + movies.Actors + "\n");
            fs.appendFileSync("log.txt", "|==============> End Movie Information <==============|\n");
        }
    });


    //function to get proper Rotten Tomatoes Rating
    function getRottenTomatoesRatingObject(data) {
        return data.Ratings.find(function (item) {
            return item.Source === "Rotten Tomatoes";
        });
    }

    function getRottenTomatoesRatingValue(data) {
        return getRottenTomatoesRatingObject(data).Value;
    }
}
// if `do-what-it-says` called, collect value from random.txt
function doWhatDisplay() {

    fs.readFile("random.txt", 'utf8', function (err, data) {
        if (err) {
            console.warn("|                 *an error occured*                |")
            console.log("|---------------------------------------------------|");
        }
        var dataArr = data.split(' ')
        console.log(dataArr);
        spotify.search({
            type: "track",
            query: dataArr[1]
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            };
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("|==============> Start Song Information <==============|");
                console.log(" Song information searched for " +  dataArr[1]);
                console.log(" Song name: " + songs[i].name);
                console.log(" Preview song: " + songs[i].preview_url);
                console.log(" Album: " + songs[i].album.name);
                console.log(" Artist(s): " + songs[i].artists[0].name);
                console.log("|===============> End Song Information <===============|");
            }
        })
    })
}
