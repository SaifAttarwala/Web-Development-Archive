for (i = 0; i < 7; i++)
    document.querySelectorAll(".drum")[i].addEventListener("click", playSound);

//Key Press Event Listener
document.addEventListener("keydown", playSound);

//Funtion to play sounds
function playSound(event) {
    
    var keyVal;
    if (event.type == "click") {
        keyVal = this.innerHTML;
    }
    if (event.type == "keydown") {
        keyVal = event.key;
    }
    switch (keyVal) {


        case "w":
            var tom1Drum = new Audio("sounds/tom-1.mp3");
            tom1Drum.play();

            break;
        case "a":
            var tom2Drum = new Audio("sounds/tom-2.mp3")
            tom2Drum.play();
            break;
        case "s":
            var tom3Drum = new Audio("sounds/tom-3.mp3")
            tom3Drum.play();
            break;
        case "d":
            var tom4Drum = new Audio("sounds/tom-4.mp3")
            tom4Drum.play();
            break;
        case "j":
            var snareDrum = new Audio("sounds/snare.mp3")
            snareDrum.play();
            break;
        case "k":
            var crashDrum = new Audio("sounds/crash.mp3")
            crashDrum.play();
            break;
        case "l":
            var kickDrum = new Audio("sounds/kick-bass.mp3")
            kickDrum.play();
            break;


    }
    addAnimation(keyVal);
}
function addAnimation(keyPressed){
    var animatedKey = document.querySelector("."+keyPressed).classList.add("pressed");

}
setTimeout(function(){
    animatedKey.classList.remove("pressed");
    
}, 100);