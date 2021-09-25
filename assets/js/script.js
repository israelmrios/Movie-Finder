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
        .then(function (data) {
            console.log(data);
            console.log("Title:" + data.Search[0].Title + " " + data.Search[0].imdbID)
            if ($("#movie-container").length)
                $("#movie-container").empty()
            // display results here
            // create HTML here
            $("<div/>", {
                id: "movie-container",
                class: "movie-container"
            }).appendTo("#search-region");

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
                $("<button/>", {
                    id: "button" + i,

                    class: "button",
                    text: "This one!"
                }).click({title: data.Search[i].Title,
                        imdbID: data.Search[i].imdbID, 
                        poster: data.Search[i].Poster}, 
                        getServices).appendTo("#media" + i);
                

            }
        });
}

function getServices(e) {
    // Hide the cards continer
    $("#movie-container").addClass("hidden");
    $("#results").removeClass("hidden");

    // get plot point
    var plotURL = "http://omdbapi.com/?i=" + e.data.imdbID + "&plot=full&r=json&apikey=405ba6dc&"
    fetch(plotURL)
        .then(function (res) {
            console.log(res);
            return res.json();
        })
        .then(function (data) {
            $("<p/>", {
                id: "movie-text"
            }).text(data.Plot).appendTo("#description");
        })

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

// function reload(){
//     location.reload()
// };

$("#return").click(function () {
    location.reload()
});

$(function () {
    console.log("Ready!");
    $("#btn").click(getMovieList)
});


//TODO: 