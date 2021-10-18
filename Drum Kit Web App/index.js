//Detecting MouseCLick

for (var i = 0; i < 7; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    var buttonPressed = this.innerHTML;
    switchKey(buttonPressed);
    buttonAnimation(buttonPressed);
  });
}

//Detecting Keyboard

document.addEventListener("keydown", function(e){

  switchKey(e.key);
  buttonAnimation(e.key);
});

function switchKey(buttonPressed) {

  switch (buttonPressed) {
    case 'w':
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;
    case 'a':
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;
    case 's':
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;
    case 'd':
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;
    case 'j':
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;
    case 'k':
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
    case 'l':
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    default:
      console.log(buttonPressed);

  }
}

function buttonAnimation(buttonPressed){
  var activeButton = document.querySelector("." + buttonPressed);
  activeButton.classList.add("pressed");
  setTimeout(function(){
    activeButton.classList.remove("pressed");}, 100); 
}
