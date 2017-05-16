
var triviaBank=[
	["Fining Nemo",
	"What is Nemo's father name in the movie Finding Nemo?",
	"Marlin",
	"Alan",
	"Gill",
	"Mr. Ray",
	2,
	'<img src="assets/images/nemo.gif" width="480" height="271" frameBorder="0">'],
	["Brave",
	"Which Pixar movie is the character Queen Elinor in?",
	"The Good Dinosaur",
	"Brave",
	"Toy Story",
	"WALL-E",
	3,
	'<img src="assets/images/brave.gif" width="480" height="271" frameBorder="0">'],
	["WALL-E",
	"Who did WALL-E fall in love with?",
	"AVA",
	"ROSE",
	"EVE",
	"AVE",
	4,
	'<img src="assets/images/wall-e.gif" width="480" height="271" frameBorder="0">'],
	["Up",
	"What is the name of the balloon salesman in the movie Up?",
	"Eric",
	"Carl",
	"Russel",
	"Ed",
	3,
	'<img src="assets/images/up.gif" width="480" height="271" frameBorder="0">'],
	["Ratatouille",
	"Where does Remy, the master chef rat, live in the movie Ratatouille?",
	"London",
	"Paris",
	"New York",
	"Tokyo",
	3,
	'<img src="assets/images/ratatouille.gif" width="480" height="271" frameBorder="0">']
];
var currentTimer=10;
var currentQuestion=0;
var timerInterval=0;
var answerResult="";
var correctAnswer=0;
var incorrectAnswer=0;
var unanswered=0;

$( document ).ready(function() {
	$("#start").click(function(){
		startTimer();
		$(".startButton").addClass("notDisplayed");
		$("#correctAnswerPic").html("");
		generateQuestion(currentQuestion);
	});

	$(document).on("click","#answerChoice1",function(){answerChoiceClick(1);});
	$(document).on("click","#answerChoice2",function(){answerChoiceClick(2);});
	$(document).on("click","#answerChoice3",function(){answerChoiceClick(3);});
	$(document).on("click","#answerChoice4",function(){answerChoiceClick(4);});
	$(document).on("click","#restart",function(){restart();});

});

function startTimer(){
	$("#timer").html("Time Remaining: "+currentTimer+" seconds");
	timerInterval=setInterval(function(){
		currentTimer--;
		$("#timer").html("Time Remaining: "+currentTimer+" seconds");
		if(currentTimer<1){
			outOfTime();
		};
	},1000);
};

function outOfTime(){
	clearInterval(timerInterval);
	unanswered++;
	answerResult="<div style='color:teal;'>Out of time!</div>";
	generateAnswer();

};

function generateQuestion(x){
	$("#question").html(triviaBank[x][1]);
	$("#answerChoice").removeClass("notDisplayed");
	$("#answerChoice1").html(triviaBank[x][2]);
	$("#answerChoice2").html(triviaBank[x][3]);
	$("#answerChoice3").html(triviaBank[x][4]);
	$("#answerChoice4").html(triviaBank[x][5]);
	$("#correctAnswer").html("");
	$("#correctAnswerPic").html("");
};

function generateAnswer(){
	currentTimer=10;
	displayAnswer();
	if(currentQuestion<(triviaBank.length-1)){
		currentQuestion++;
		setTimeout(function(){
			generateQuestion(currentQuestion);
			startTimer();
		},3000);
	}
	else{
		setTimeout(function(){
			generateGameSummary();
		},3000);
	};
};

function displayAnswer(){
	$("#question").html(answerResult);
	$("#answerChoice").addClass("notDisplayed");
	$("#correctAnswer").html("<div>The Correct Answer was: <b style='color:gold;'>"+triviaBank[currentQuestion][triviaBank[currentQuestion][6]]+"</b></div>");
	$("#correctAnswerPic").html(triviaBank[currentQuestion][7]);
};

function answerChoiceClick(y){
	clearInterval(timerInterval);
	if(triviaBank[currentQuestion][6]==(y+1)){
		answerResult="<div style='color:limegreen;'>YES!</div>";
		correctAnswer++;
	}
	else{
		answerResult="<div style='color:firebrick;'>NOPE!</div>";
		incorrectAnswer++;
	}
	generateAnswer();
};

function restart(){
	currentQuestion=0;
	correctAnswer=0;
	incorrectAnswer=0;
	unanswered=0;

	$(".restartButton").addClass("notDisplayed");
	$("#gameSummary").html("");

	startTimer();
	generateQuestion(currentQuestion);
};

function generateGameSummary(){
	$("#question").html("");
	$("#answerChoice").addClass("notDisplayed");
	$("#correctAnswer").html("");
	$("#correctAnswerPic").html("");
	$(".restartButton").removeClass("notDisplayed");
	$("#gameSummary").html("<h3>Scoreboard!</h3>"+
		"<div style='color:limegreen;'>Correct Answers: "+ correctAnswer+ "</div>" +
		"<div style='color:firebrick;'>Incorrect Answers: "+ incorrectAnswer+ "</div>" +
		"<div style='color:teal;'>Unanswered: "+ unanswered+ "</div>"
		);
};


