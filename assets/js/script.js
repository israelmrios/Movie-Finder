function getMovieList(e) {
    console.log("SUBMIT!");
    e.preventDefault();
    var omdbRequestURL = "https://omdbapi.com/?s=" + $("#user-search").val() + "&apikey=405ba6dc";
    $("#movie-container").focus()

    fetch(omdbRequestURL)
        .then(function (res) {
            console.log(res.status);
            return res.json();
        })
        .then(function(data) {
            console.log(data);
            console.log("Title:" + data.Search[0].Title + " " + data.Search[0].imdbID)
            
            $("<div/>", {
                id: "movie-container",
                class: "movie-container"
            }).appendTo("#search-region");
            
            for (var i = 0; i < data.Search.length; i++){
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
                $("<button/>", {
                    id: "button" + i,
                    class: "button"
                }).click({param1: data.Search[i].imdbID}, getServices).appendTo("#media" + i);
                
            }
        })
}

function getServices (e) {
    // Hide the cards continer
    $("#movie-container").addClass("hidden");
    $("#results").removeClass("hidden");

    // get plot point
    var plotURL = "http://img.omdbapi.com/?apikey=405ba6dc&t=" + e.data.imdbID + "&plot=short"
    fetch(plotURL)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            
        })

    console.log("getServices");
    console.log(e.data.imdbID);

    $("<img/>", {
        src: e.data.poster,
        alt: e.data.title
    }).appendTo("#picture1");
    $("<h2/>").html(e.data.title).appendTo("#movie-title");
    // Add description here

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
                // Parse Data here ...#btn
                
                
                // create an object that translates the intial part
                // of the link to a easy to interpret string.
                // OR store the first parts of the HTML link as an object
                // then compare that to the results from the goWatch API
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
    $("#btn").click(getMovieList)
});


//TODO: add plot to selection call from omdb
//http://img.omdbapi.com/?apikey=" +key+ "&t=" + userInput + "&plot=short