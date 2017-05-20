var animalsArray=["Batman","Spiderman","Superman","Flash","Ironman","Wolverine","Green Lantern","Hulk","Thor","Wonder Woman"];
var queryBegin="https://api.giphy.com/v1/gifs/search?q=";
var queryEnd="&api_key=dc6zaTOxFJmzC&limit=10";


$( document ).ready(function() {
	createButtons();

	$("#addAnimal").on("click",function(event){
		event.preventDefault();
		var animalInput = $("#animal-input").val().trim();
		
		if(!(animalInput==="")){
			animalsArray.push(animalInput);
			$("#animalButtonArea").empty();
			createButtons();

			$("#animal-input").val("");
		}
	})

	$(document).on("click",".animalButton",function(){
		$("#animals").empty();
		var queryURL=queryBegin + $(this).html() + queryEnd;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			for(var i =0; i<response.data.length; i++){
				var animalImage = $("<img>");
				var animalRating = $("<div>");

				animalRating.html("<strong>Rating: "+response.data[i].rating +"</strong><br/>");
				animalRating.addClass("animalGif");
				animalImage.addClass("giphy");				
				animalImage.attr("src",response.data[i].images.fixed_height_still.url);
				animalImage.attr("data-id",response.data[i].id);
				animalImage.attr("data-still",response.data[i].images.fixed_height_still.url);
				animalImage.attr("data-animate",response.data[i].images.fixed_height.url);
				animalImage.attr("data-state","still");
				animalRating.append(animalImage);
				$("#animals").append(animalRating);
			}
		});

	});

	$(document).on("click",".giphy",function(){

		if($(this).attr("data-state")=="still"){
			$(this).attr("src",$(this).attr("data-animate"));
			$(this).attr("data-state","animate");
		}
		else{
			$(this).attr("src",$(this).attr("data-still"));
			$(this).attr("data-state","still");
		}

	});

});

function createButtons(){
	for(var i=0;i<animalsArray.length;i++){
		var button = $("<button>");
		button.addClass("btn btn-default animalButton");
		button.attr("data-name",animalsArray[i]);
		button.html(animalsArray[i]);
		$("#animalButtonArea").append(button);
	};
}