//application first request's for .gitignored'd .env folder
require("dotenv").config();

//application required packages before running
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

// capture GitBash command line values
var userCommand = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

// command exicution controller
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
            failSafeDisplay()
            break;
    }
}

userValue();

// case exicution functions
function concertDisplay() {
    console.log("Concert called " + userInput)
};

function songDisplay() {
    console.log("Spotify called " + userInput)
};

function movieDisplay() {
    console.log("Movie called " + userInput)
};

function failSafeDisplay() {
fs.readFile("random.txt", 'utf8', function(err, data) {
  if (err) throw err;
  console.log(data)
  userValue(data);
});
};