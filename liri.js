require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();

var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
var queryBandsurl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

if (command === "movie-this" && userInput) {
	getMovie();
} else if (command === "movie-this") {
	getMovieNobody();
}

// if (command === "do-what-it-says") {
// }

if (command === "concert-this") {
	getConcert();
}

function getMovie() {
	axios.get(queryUrl).then(function(response) {
		console.log("The movie is: " + response.data.Title);
		console.log("Year: " + response.data.Year);
		console.log("IMDB Rating: " + response.data.imdbRating);
		console.log("Country: " + response.data.Country);
		console.log("Language: " + response.data.Language);
		console.log("Plot: " + response.data.Plot);
		console.log("Actors: " + response.data.Actors);
	});
}
function getMovieNobody() {
	axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(function(response) {
		console.log("The movie is: " + response.data.Title);
		console.log("Year: " + response.data.Year);
		console.log("IMDB Rating: " + response.data.imdbRating);
		console.log("Country: " + response.data.Country);
		console.log("Language: " + response.data.Language);
		console.log("Plot: " + response.data.Plot);
		console.log("Actors: " + response.data.Actors);
	});
}

function getConcert() {
	axios.get(queryBandsurl).then(function(response) {
		console.log("The venue is: " + response.data[0].venue.name);
		console.log("Location: " + response.data[0].venue.city);
		console.log("Event Date: " + moment(response.data[0].datetime, moment.ISO_8601).format("MM/DD/YYYY"));
	});
}
