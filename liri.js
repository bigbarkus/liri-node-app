require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
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

if (command === "spotify-this-song" && userInput) {
	spotifySong();
} else if (command === "spotify-this-song") {
	spotifySongSign();
}

if (command === "concert-this") {
	getConcert();
}

function getMovie() {
	axios.get(queryUrl).then(function(response) {
		console.log("--------------------");
		console.log("The movie is: " + response.data.Title);
		console.log("Year: " + response.data.Year);
		console.log("IMDB Rating: " + response.data.imdbRating);
		console.log("Country: " + response.data.Country);
		console.log("Language: " + response.data.Language);
		console.log("Plot: " + response.data.Plot);
		console.log("Actors: " + response.data.Actors);
		console.log("--------------------");
	});
}
function getMovieNobody() {
	axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(function(response) {
		console.log("--------------------");
		console.log("The movie is: " + response.data.Title);
		console.log("Year: " + response.data.Year);
		console.log("IMDB Rating: " + response.data.imdbRating);
		console.log("Country: " + response.data.Country);
		console.log("Language: " + response.data.Language);
		console.log("Plot: " + response.data.Plot);
		console.log("Actors: " + response.data.Actors);
		console.log("--------------------");
	});
}

function getConcert() {
	axios.get(queryBandsurl).then(function(response) {
		console.log("--------------------");
		console.log("The venue is: " + response.data[0].venue.name);
		console.log("Location: " + response.data[0].venue.city);
		console.log("Event Date: " + moment(response.data[0].datetime, moment.ISO_8601).format("MM/DD/YYYY"));
		console.log("--------------------");
	});
}

function spotifySong() {
	spotify
		.search({ type: "track", query: userInput })
		.then(function(response) {
			console.log("--------------------");
			console.log(response.tracks.items[0].album.artists[0].name);
			console.log(userInput);
			console.log(response.tracks.items[0].album.external_urls.spotify);
			console.log(response.tracks.items[0].album.name);
			console.log("--------------------");
		})
		.catch(function(err) {
			console.log(err);
		});
}

function spotifySongSign() {
	spotify
		.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
		.then(function(data) {
			console.log("--------------------");
			console.log(data.album.artists[0].name);
			console.log("The Sign");
			console.log(data.album.external_urls.spotify);
			console.log(data.album.name);
			console.log("--------------------");
		})
		.catch(function(err) {
			console.log(err);
		});
}
