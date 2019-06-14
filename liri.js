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
function userValue () {
    switch (userCommand){
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
        request(queryUrl, function(error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("|============> Start Event Information <============|");
                console.log(" Concerts searched for " + userInput);
                console.log(" Venue Location: " +  concerts[i].venue.city);
                console.log(" Name of the Venue: " + concerts[i].venue.name);
                console.log(" Date of the Event: " +  concerts[i].datetime);
                console.log("|=============> End Event Information <=============|");
            }}else{
                console.warn("|                 *an error occured*                |")
                console.log("|---------------------------------------------------|");
            };
    });}


    // call spotify with i.d & secret, hidden from git.
    function songDisplay() {
        console.log("|=============> Start Song Information <============|");
        console.log(" Song information searched for " + userInput);
        console.log(" name of venue");
        console.log(" venue location");
        console.log(" date of concert");
        console.log("|==============> End Song Information <=============|");
    };

    // axios call to OMDB
    function movieDisplay() {
        console.log("|============> Start Movie Information <============|");
        console.log(" Concert called " + userInput);
        console.log(" name of venue");
        console.log(" venue location");
        console.log(" date of concert");
        console.log("|=============> End Movie Information <=============|");
    };

    // if `do-what-it-says` called, collect value and run case `spotify-this-song` with pre-written value
    function doWhatDisplay() {
    fs.readFile("random.txt", 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    });
    };