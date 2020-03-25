/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game{
    overlay = document.querySelector("#overlay");
     constructor(missed,activePhrase){
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
     }

     /**
      * * Begins game by selecting a random phrase and displaying it to user
      * */
     startGame= () =>{
         this.overlay.style.visibility = 'hidden'; 
         this.activePhrase = this.getRandomPhrase();
         this.activePhrase.addPhraseToDisplay();
     }

     /**
      * * Selects random phrase from phrases property
      * * @return {Object} Phrase object chosen to be used
      * */
     getRandomPhrase = () =>{
         const rand = Math.floor(Math.random() * this.phrases.length);
         return this.phrases[rand];

     }

     /**
        * Handles onscreen keyboard button clicks
        * @param (HTMLButtonElement) button - The clicked button element
        */
     handleInteraction = (button) =>{
         const letterClicked = button.innerHTML;
         button.disabled = true;
         if(this.activePhrase.checkLetter(letterClicked)){
             button.className += " chosen";
             this.activePhrase.showMatchedLetter(letterClicked);
             if(this.checkForWin()){
                 this.gameOver(true);
             }
         }
         else{
            button.className += " wrong";
            this.removeLife();
         }
     }

     /**
        * Increases the value of the missed property
        * Removes a life from the scoreboard
        * Checks if player has remaining lives and ends game if player is out
        */
     removeLife=() =>{
         const lifes= document.querySelectorAll(".tries");
         const child = lifes[this.missed].firstChild;
         child.src = child.src.replace("liveHeart.png","lostHeart.png");
         this.missed += 1;
         if(this.missed ==5){
             this.gameOver(false);
         }


     }

     /**
      * * Checks for winning move
        * @return {boolean} True if game has been won, false if game wasn't
        won
        */
     checkForWin = () =>{
         const li = this.activePhrase.ul.querySelectorAll('li');
         const liArray = this.activePhrase.nodeListToArray(li);
         return liArray.reduce((acc,cur) =>{
             return (cur.className.includes("show") || cur.className.includes("space") )&& acc;
         },true);
     }

     /**
        * Displays game over message
        * @param {boolean} gameWon - Whether or not the user won the game
        */
     gameOver = (gameWon) =>{
        this.overlay.style.visibility = "visible";
        const h1 = this.overlay.querySelector("h1");
         if(gameWon){
             h1.className = "win";
             h1.innerHTML = "You Win!";
         }
         else{
            h1.className = "lose";
            h1.innerHTML = "You Lost.";
         }
         this.reset();
     }


     /**
      * Reset everything after game is over
      */
     reset=() =>{
         this.activePhrase.ul.innerHTML = "";
         const keyboards = document.querySelectorAll(".key");
         keyboards.forEach(keyboard => {
             keyboard.className = "key";
             keyboard.disabled = false;
        });
        const lifes= document.querySelectorAll(".tries");
        lifes.forEach(life =>life.firstChild.src = "images/liveHeart.png");

     }

     /**
      * * Creates phrases for use in game
      * * @return {array} An array of phrases that could be used in the game
      * */
     createPhrases =() =>{
         let phrases = [];
         let phrase1 = new Phrase("Life is like a box of chocolates");
         phrases.push(phrase1);
         let phrase2 = new Phrase("there is no trying");
         phrases.push(phrase2);
         let phrase3 = new Phrase("may the force be with you");
         phrases.push(phrase3);
         let phrase4 = new Phrase("You have to see the matrix yourself");
         phrases.push(phrase4);
         let phrase5 = new Phrase("You talking to me");
         phrases.push(phrase5);
         return phrases;

     };



 }