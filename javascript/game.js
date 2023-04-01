var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

$(document).on("keydown", function () {
    if (!started) {
        $("#title").text("Level " + level)
        nextSequence()
        started = true

    }
})

function nextSequence() {
    level++
    $("#title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}

$(".simon-button").on("click", function () {
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    checkAnswer(userClickedPattern.length - 1);

})

function playSound(name) {
    var sound = new Audio(`../css/sounds/${name}.mp3`)
    sound.play()
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
                userClickedPattern = []
            }, 1000)
        }

    } else {
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#title").text("Game over! Press any key to restart!")
        startOver()
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
