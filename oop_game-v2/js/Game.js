/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game{
     constructor(missed,activePhrase){
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
     }

     startGame= () =>{
         const overlay = document.querySelector("#overlay");
         overlay.style.visibility = 'hidden'; 
         this.activePhrase = this.getRandomPhrase();
         this.activePhrase.addPhraseToDisplay();
     }
     getRandomPhrase = () =>{
         const rand = Math.floor(Math.random() * this.phrases.length);
         return this.phrases[rand];

     }
     handleInteraction = () =>{}
     removeLife=() =>{
         const life= document.querySelector("#scoreboard >ol");

     }
     checkForWin = () =>{}
     gameOver = () =>{}

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