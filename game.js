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
  const audio = new Audio("sounds/" + id + ".mp3");
  setTimeout(function () {
    $("#" + id).addClass("pressed");
    setTimeout(function () {
      $("#" + id).removeClass("pressed");
    }, 250);
    audio.play();
  }, 250);
}

$("#level-title").click(function () {
  if (!started) {
    genTile();
    started = true;
  }
});

$("div[type='button']").click(function () {
  const id = $(this).attr("id");

  if (started) {
    const audio = new Audio("sounds/" + id + ".mp3");
    $("#" + id).addClass("pressed");
    setTimeout(function () {
      $("#" + id).removeClass("pressed");
    }, 150);
    audio.play();
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
      $("#level-title").text(
        `Score: ${level - 1},High Score: ${localStorage.getItem(
          "score"
        )} Game Over, Click Here to Restart`
      );
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
