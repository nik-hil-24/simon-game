var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = false;


function playSound(name){

  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();

}


function animatePress(currentColour){

  var activeButton = "#" + currentColour;

  $(activeButton).addClass("pressed");

  setTimeout(function(){

    $(activeButton).removeClass("pressed");

  }, 100);

}


function nextSequence(){

  var randomNum = Math.floor((Math.random()*10)%4);
  var randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);

  $("#"+randomColor).fadeOut(35).fadeIn(35);
  playSound(randomColor);

  $("h1").html("Level "+level);
  level++;
  userClickedPattern = [];

}


$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length-1);

});


$(document).keydown(function() {

  if(!start){

    nextSequence();

    start = true;

  }

});


function startOver(){

  level = 0;

  gamePattern = [];

  start = false;

  userClickedPattern = [];

}


function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length ){

      setTimeout(function (){

        nextSequence()

      }, 1000);

    console.log("ss");

    }

  }

  else{

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function (){

      $("body").removeClass("game-over");

    }, 200 );

    $("h1").html("Game Over, Press Any Key to Restart");

    startOver();

    console.log("Failure");

  }

}
