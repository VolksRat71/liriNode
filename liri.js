require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
console.log(userInput);

function userValue (command) {
    switch (command){
        case `concert-this`:
            console.log("concert called")
            break;
        
        case `spotify-this-song`:
            console.log("spotify called")
            break;
        
        case `movie-this`:
            console.log("movie called")
            break;
        
        case `do-what-it-says`:
            console.log("says called")
            break;
    }
}

userValue(userCommand);