var stars = ["lebron james", "kobe bryant", "neymar jr", "cristiano ronaldo", "odell beckham", "yuna kim", "ken block"];

function buttonGenerator() {

    for (var i=0; i<stars.length; i++) {
        var button = $("<button>");
        button.text(stars[i]);
        button.addClass("button");
        button.attr("data-value", stars[i]);
        $("#buttons").append(button);
    }

}

$(".button").on("click", function() {

    var star = $(this).attr("data-value");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    star + "&api_key=YPb4gbszuqY25hsotltsHCsfa4vO8Xwi&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            var results = response.data;

            for (var j=0; j<results.length; j++) {
                var starDiv = $("<div>");

                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height_small_still.url);
                image.attr("data-still", results[i].images.fixed_height_small_still.url);
                image.attr("data-animate", results[i].images.fixed_height_small.url);
                image.attr("data-state", "still");

                var rating = $("<p>").text("Ratings: " + results[i].rating);

                starDiv.append(image);
                starDiv.append(rating);

                $("#gifs").append(starDiv);
            }
        });
});

$("img").on("click", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate")); 
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});

$("#submit").on("click", function() {
    $("#buttons").empty();
    var entry = $("#new-button").val().trim();
    stars.push(entry);
    buttonGenerator();
});

buttonGenerator();