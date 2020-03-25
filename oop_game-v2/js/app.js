/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startGame = document.querySelector("#btn__reset");
let game;
//const game = new Game();
startGame.addEventListener("click",() =>{
    game = new Game();
    game.startGame();
});

console.log(game);
const keyboards = document.querySelectorAll(".key");
document.addEventListener("keydown",(e)=>{
    
    if(/^Key/.test(e.code)){
        const letter = e.code.charAt(e.code.length-1).toLowerCase();
        keyboards.forEach(keyboard =>{
            if(keyboard.innerHTML === letter){
                keyboard.click();
            }
        })
    }
});

keyboards.forEach(keyboard => {
        keyboard.addEventListener("click",(e)=>{
            game.handleInteraction(e.target);
        });
});
