var JBKey = "f4ceaec9f5mshd595b95b571776ap16c077jsn471bb392e0d1"
var CarlosKey = "f23c6f8922msh66c1e577a5d9a54p1f699djsn591541dac664"
var IsrealKey = "68e56fb629mshd9bc9c2bab39abdp1e8f8ejsn5a5cdb6e24a2"
var AydinKey = "5cfd71de82msh5e735751f442143p1e03bcjsn78a94c1d0a36"

function getMovieList(e) {
    e.preventDefault();
    var omdbRequestURL = "https://omdbapi.com/?s=" + $("#user-search").val() + "&type=movie&apikey=405ba6dc";
    $("#noResults").addClass("hidden");
    $("#noResultOmdb").addClass("hidden");
    $("#movie-container").focus();
    $("#movie-container").removeClass("hidden");
    $("#results").addClass("hidden")
    fetch(omdbRequestURL)
        .then(function (res) {
            console.log(res.status);
            return res.json();
        })
        .then(function (data) {
            console.log(data.Response);
            if (data.Response === "False") {
                $("<div/>", {
                    id: "noResultOmdb",
                    class: "noResultz"
                }).text("Sorry this movie is not available in any of the top 6 streaming services. Please try a different movie.").appendTo("#search-region");
                return;
            }

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

                if (data.Search[i].Poster === "N/A") {
                    $("<img/>", {
                        src: "./assets/imgs/spongemiboy.png",
                        alt: data.Search[i].Title
                    }).appendTo("#figure" + i);
                    console.log("no pic")
                } else {
                    $("<img/>", {
                        src: data.Search[i].Poster,
                        alt: data.Search[i].Title
                    }).appendTo("#figure" + i);
                }
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
                }).click({
                    title: data.Search[i].Title,
                    imdbID: data.Search[i].imdbID,
                    poster: data.Search[i].Poster
                },
                    getServices).appendTo("#media" + i);
            }
        });
}

function getServices(e) {
    // Hide the cards continer
    $("#movie-container").addClass("hidden");
    $("#results").removeClass("hidden");
    if ($("#picture1").length)
        $("#picture1, #description, #movie-title").empty()


    // get plot point
    var plotURL = "http://omdbapi.com/?i=" + e.data.imdbID + "&plot=full&r=json&apikey=405ba6dc&"
    fetch(plotURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            $("<p/>", {
                id: "movie-text"
            }).text(data.Plot).appendTo("#description");
        })
    console.log(e.data.poster)
    $("<img/>", {
        src: e.data.poster,
        alt: e.data.title
    }).appendTo("#picture1");
    $("<h2/>").html(e.data.title).appendTo("#movie-title");

    fetch("https://gowatch.p.rapidapi.com/lookup/title/imdb_id", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-host": "gowatch.p.rapidapi.com",
            "x-rapidapi-key": JBKey
        },
        body: JSON.stringify({
            id: e.data.imdbID,
            type: "movie",
            country: "us"
        })
    })
        .then(function (res) {
            console.log(res.status)
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            parseResults(data.offers);
        })
}

function parseResults(servicesArray) {
    var service, serviceURL;
    var result = false;
    if (typeof servicesArray !== "undefined") {
        for (var i = 0; i < servicesArray.length; i++) {
            if ((servicesArray[i].buy === 0 && servicesArray[i].rent === 0 && servicesArray[i].channel === null) && servicesArray[i].collection_name !== "The") {
                console.log(servicesArray[i].url)
                service = servicesArray[i].url.split(".")[1];
                service = service.charAt(0).toUpperCase() + service.slice(1);
                console.log(service);
                serviceURL = servicesArray[i].url;
                $("<button/>", {
                    class: service + " butt",
                    id: "button" + i
                }).html(service).val(serviceURL).click(link).appendTo("#stream-btns")
                result = true;
            }
        }
    }
    if (!result) {
        console.log("No movie found!");
        $("#noResults").removeClass("hidden");
    }

}

function link(e) {
    window.open(e.target.value, "_blank");
}

$("#return").click(function () {
    location.reload()
});

$(function () {
    console.log("Ready!");
    $("#btn").click(getMovieList)
});

