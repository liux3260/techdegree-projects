/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor (phrase) {
        this.phrase = phrase.toLowerCase();
    }
    addPhraseToDisplay = () =>{
        const ul = document.querySelector("#phrase > ul");
        for (let index = 0; index < this.phrase.length; index++) {
            const li = document.createElement('li');
            if(this.phrase.charAt(index) == " "){
                li.className = 'space';
                li.innerHTML = " ";
            }
            else{
                li.className = `hide letter ${this.phrase.charAt(index)}`;
                li.innerHTML = this.phrase.charAt(index);
            }
            ul.appendChild(li);
            
        }
    }
    checkLetter = () =>{}
    showMatchedLetter = () =>{}

}
