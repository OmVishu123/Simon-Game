let divs = document.querySelectorAll(".inner")
let user_arr = []
let sys_arr = []
let level = 0;
let started = false;

// step 1 - Start
document.querySelector(".initialize").addEventListener("click" , function(){
    if (started == false) {
        started = true;
        console.log("Game started");
        levelUp()

    }
})
//step -2  level Up
function levelUp() {
    user_arr = []  // reset the user array
    level += 1; //level increses
    document.querySelector("h3").innerText = `Level ${level}` // level display
    let num = generateRandomNumber() // adds next step
    sys_arr.push(num)
    console.log(sys_arr); 
    BtnFlash(divs[num]); //flashes the clicked button

}
// flash 
function BtnFlash(btn) {
    btn.classList.add("flash") // refer to css .flash class styling
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 350);
}
// Random number generator
function generateRandomNumber() {
    let num = Math.floor(Math.random() * 4)
    return num
}
// function - check ans
function checkAns(idx) {
    if (sys_arr[idx] === user_arr[idx]) { //checks the input given by user matches the value in system arr at the given index 
        if (user_arr.length == sys_arr.length) { // If all values matches -level up
            setTimeout(levelUp, 1000)
        }

    } else {
        document.querySelector("h3").innerHTML = `Game over! Your score is <b>${level}</b>.<br>`
        reset();
    }


}
//button pressed
function btnPressed() {
    let btn = this; // this targets the button/div
    BtnFlash(btn)
    let id = parseInt(btn.getAttribute("id")); // fetch the exact button id
    user_arr.push(id)
    checkAns(user_arr.length - 1) // check for the correct input by user
}


for (btn_b of divs) {
    btn_b.addEventListener("click", btnPressed)
}
//reset 
function dblFlash() {
    for (btn_b of divs) {
      //All button flash
        BtnFlash(btn_b)
    }
  // Body flash(red)
    document.querySelector("body").classList.add("red_flash")
    setTimeout(() => {
        document.querySelector("body").classList.remove("red_flash")
    }, 350);
    
}
function reset() {
    started = false;
    level = 0;
    sys_arr = []
    user_arr = []
  // Alert when game is over
    setTimeout(dblFlash, 500)
    setTimeout(dblFlash, 1000)
}
