// relevant aps
//  www.omdbapi.com - use this to get search results
//  once we have 3 search results post that to the user
// when the user clicks on the movie
// link pass the imdb_id to the gowatch


// 1. User clicks on checkboxes
// 2. we display the avaliable movies



// TEST FUNCTIONS
function getMovieList(e) {
    console.log("SUBMIT!");
    e.preventDefault();
    var omdbRequestURL = "https://omdbapi.com/?s=" + $("#user-search").val() + "&apikey=405ba6dc";
    var userData = e.data;

    fetch(omdbRequestURL)
        .then(function (res) {
            console.log(res.status);
            return res.json();
        })
        .then(function(data) {
            console.log(data);
            console.log("Title:" + data.Search[0].Title + " " + data.Search[0].imdbID)
            
            // display results here
            // create HTML here
            $("<div/>", {
                id: "movie-container"
                // add classes here
            }).appendTo("#col-container");
            
            // get movie info
            for (var i = 0; i < data.Search.length; i++) {
                // main card
                $("<div/>", {
                    id: "card" + i,
                    class: "card" 
                }).appendTo("#movie-container");
                // image container
                $("<div/>", {
                    id: "card-image" + i,
                    class: "card-image"
                }).appendTo("#card" + i);
                $("<figure/>", {
                    id: "figure" + i,
                    class: "image is-4by3"
                }).appendTo("#card-image" + i);
                $("<img/>", {
                    src: data.Search[i].Poster,
                    alt: data.Search[i].Title
                }).appendTo("#figure" + i);
                // content container
                $("<div/>", {
                    id: "card-content" + i,
                    class: "card-content"
                }).appendTo("#card" + i);
                $("<div/>", {
                    id: "media" + i,
                    class: "media-content"
                }).appendTo("#card-content" + i);
                // add movie title and stuff here
                $("<p/>", {
                    // add style classes here
                }).text(data.Search[i].Title + " " + data.Search[i].Year).appendTo("#media" + i);
                userData.imdbID = data.Search[i].imdbID;
                console.log("userData: " + userData.imdbID);
                $("<button/>", {
                    id: "button" + i,
                    class: "button"
                }).click(userData, getServices).appendTo("#media" + i);
                
            }
        })
}

function getServices (e) {
    // Hide the cards continer
    // $("#movie-container").hide();

    console.log("getServices");
    console.log(e.data);

    // fetch("https://gowatch.p.rapidapi.com/lookup/title/imdb_id", {
	// "method": "POST",
	// "headers": {
	// 	"content-type": "application/x-www-form-urlencoded",
	// 	"x-rapidapi-host": "gowatch.p.rapidapi.com",
	// 	"x-rapidapi-key": "f23c6f8922msh66c1e577a5d9a54p1f699djsn591541dac664"
	// },
	// "body": {
	// 	"id": e.data.imdbID, // check this
	// 	"type": "movie",
	// 	"country": "us"
	// }
    // })
    //     .then(function(data) {
            
    //     })

    
    // now compare the results to the user selected filters (if any)
    // if it's not on the platform suggest the ones it's on

    // parse result array here


}

function parseResults(servicesArray) {
    // write object with service names, for loop, compare, return object
}


function redirect(e) {
    // display available movie links, compare this to user request

}

$(function() {
    console.log("Ready!");
    $("#btn").click({
        param1: $("#hulu").is(":checked"), 
        param2: $("#hbomax").is(":checked"),
        param3: $("#netflix").is(":checked"),
        param4: $("#disney").is(":checked"),
        param5: $("#primevideo").is(":checked"),
        param6: $("#googleplay").is(":checked")}, getMovieList)
});