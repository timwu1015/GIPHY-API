var stars = ["lebron james", "kobe bryant", "neymar jr", "cristiano ronaldo", "odell beckham", "yuna kim", "ken block"];


function buttonGenerator() {

    for (i = 0; i<stars.length; i++) {
        var button = $("<button>");
        button.text(stars[i]);
        button.addClass("button");
        button.attr("data-value", stars[i]);
        $("#buttons").append(button);
    }

}

$(document.body).on("click", ".button", function() {
    $("#gifs").empty();    

    var star = $(this).attr("data-value");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + star + "&api_key=YPb4gbszuqY25hsotltsHCsfa4vO8Xwi&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            var results = response.data;

            for (var j=0; j<results.length; j++) {
                var starDiv = $("<div>");
                starDiv.addClass("inline");

                var image = $("<img>");
                image.attr("src", results[j].images.fixed_height_small_still.url);
                image.attr("data-still", results[j].images.fixed_height_small_still.url);
                image.attr("data-animate", results[j].images.fixed_height_small.url);
                image.attr("data-state", "still");

                var rating = $("<p>").text("Ratings: " + results[j].rating);

                starDiv.append(image);
                starDiv.append(rating);

                $("#gifs").append(starDiv);
            }
        });
});

$(document.body).on("click", "img", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate")); 
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});

$("#submit").on("click", function(event) {

    event.preventDefault();
    $("#buttons").empty();
    var entry = $("#new-button").val().trim();
    console.log(entry);
    stars.push(entry);
    buttonGenerator();
    $("#new-button").val("");
});

buttonGenerator();