/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const game = new Game();
const startGame = document.querySelector("#btn__reset");
startGame.addEventListener("click",(e) =>{
    //const game = new Game();
    game.startGame();
});

const keyboards = document.querySelectorAll(".key");
keyboards.forEach(keyboard => {
    keyboard.addEventListener("click",(e) =>{
        game.handleInteraction();
    });
    
});