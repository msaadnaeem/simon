$('body').addClass('start')
$('#red').css('opacity', 0)
$('#yellow').css('opacity', 0)
$('#green').css('opacity', 0)
$('#blue').css('opacity', 0)
$("#level-title").text("Click here \n to start");
$("#score").text("How to play");
$("#inst1").text("A color will flash. Repeat the sequence by pressing the same color.");
$("#inst2").text("The game will continue. After each light sequence that you repeat successfully");
$("#inst3").text("A light will be added to the end.");
$("#inst4").text("If you don’t complete a sequence successfully, you will fail.");
$("#inst5").text("Try to beat your high score!");


function random() {
  return Math.floor(Math.random() * 4);
}

const colors = ["green", "red", "yellow", "blue"];
var started = false;
var pattern = [];
var level = 1;
var click = 1;
var check = 0;



function genTile() {
  $("#level-title").text("Level " + level);
  const id = colors[random()];
  pattern.push(id);
  //  const audio = new Audio("sounds/" + id + ".mp3");
  setTimeout(function () {
    $("#" + id).addClass("pressed");
    setTimeout(function () {
      $("#" + id).removeClass("pressed");
    }, 250);
    //   audio.play();
  }, 350);
}

$("#level-title").click(function () {
  if (!started) {
    $("#score").text("");
    $("#high-score").text("");
    $('body').removeClass('start')
    $('#red').css('opacity', 100)
    $('#yellow').css('opacity', 100)
    $('#green').css('opacity', 100)
    $('#blue').css('opacity', 100)
    $("#inst1").text("");
    $("#inst2").text("");
    $("#inst3").text("");
    $("#inst4").text("");
    $("#inst5").text("");


    genTile();
    started = true;
  }
});

$("div[type='button']").click(function () {
  const id = $(this).attr("id");

  if (started) {
    // const audio = new Audio("sounds/" + id + ".mp3");
    $("#" + id).addClass("pressed");
    setTimeout(function () {
      $("#" + id).removeClass("pressed");
    }, 150);
    // audio.play();
  }
  if (click <= level && started) {
    if (pattern[check] === id) {
      check++;
      click++;
    } else {
      if (
        localStorage.getItem("score") === null ||
        localStorage.getItem("score") < level - 1
      ) {
        localStorage.setItem("score", level - 1);
      }
      $("#level-title").text(`Game Over, Click Here to Restart`);
      $("#score").text(`Score: ${level - 1}`);
      $("#high-score").text(`High Score: ${localStorage.getItem("score")}`);

      const audio = new Audio("sounds/wrong.mp3");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      audio.play();
      started = false;
      pattern = [];
      level = 1;
      click = 1;
      check = 0;
    }
  }
  console.log(click, level);
  if (click > level) {
    console.log("i am in");
    level++;
    click = 1;
    check = 0;
    genTile();
  }
});
