//GAME CONSTANTS AND VARIABLE
let inputDir = { x: 0, y: 0 };                //start after key press
const gameOverSound = new Audio('gameover.mp3');
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.wav');
const musicSound = new Audio('music.mp3');

let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };
let score = 0;

//Game functions
function main(ctime) {                             //ctime = current time
    window.requestAnimationFrame(main);            //to handle fps
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sArr){
    //when snake touch himself
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // if snake touch wall
    if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0){
        return true;
    }
    return false;
}

function gameEngine() {
    //part1 = updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over...press any key to play again:");
        snakeArr = [{ x: 13, y: 15}];
        // musicSound.play();
        score = 0;
    }

    //if the snake eaten the food, then increment the score and regenerate the fod
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){
        foodSound.play();
        score += 1;
        if(score > hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            highScoreBox.innerHTML = "High Score: " + hiScoreVal; 
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}      //generate random value between a and b
    }

    //moving the snake
    for(let i = snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part2 = display the snake and food
    //display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('head');
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);

    });
    //display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}



//main logic starts here

let hiScore = localStorage.getItem("hiScore");
if(hiScore == null){
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
}
else{
    hiScoreVal = JSON.parse(hiScore);
    highScoreBox.innerHTML = "High Score: " + hiScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1};        //start the game
    // musicSound.play();
    moveSound.play();
    switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;   
        default:
            break;
    }
})