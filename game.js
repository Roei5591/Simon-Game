var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var hasStarted = false;
var level = 0;
var levelIndex = 0;

$(document).keypress(function() {
  if (!hasStarted) {
    nextSequence();
    hasStarted = true;
  }
});

$(".btn").click(function(event) {
  if (hasStarted) {
    userChosenColour = $(this).attr("id");

    showPressColor(userChosenColour);

    checkAnswerByIndex(userChosenColour);

  }
});

function nextSequence() {
  //get a random number btween 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // choose a random color from "red", "blue", "green" and "yellow"
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //make the button of the chosen color flash
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound
  playSound(randomChosenColour);

  //incremte the level
  level++;

  //change the level title
  $("#level-title").text("level " + level);
}

function checkAnswerByIndex(color) {
  if (gamePattern[levelIndex] === color) {
    if (levelIndex === level - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      levelIndex = 0;
    } else {
      levelIndex++;
    }
  } else {
    showGameOver();
    initNewGame();
  }
}

function showGameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  playSound("wrong")
}

function initNewGame() {
  level = 0;
  levelIndex = 0;
  hasStarted = false;
  gamePattern = [];
}

function playSound(name) {
  var audio = new Audio("sounds\\" + name + ".mp3");
  audio.play();
}

function showPressColor(currentColour) {
  playSound(currentColour);

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
