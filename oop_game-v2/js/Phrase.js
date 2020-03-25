/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    ul = document.querySelector("#phrase > ul")
    constructor (phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * * Display phrase on game board
     * */
    addPhraseToDisplay = () =>{
        //const ul = document.querySelector("#phrase > ul");
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
            this.ul.appendChild(li);
            
        }
    }

    /**
     * * Checks if passed letter is in phrase
     * * @param (string) letter - Letter to check
     * */
    checkLetter = (letter) =>{
        const li = this.ul.querySelectorAll('li');
        let liArray = this.nodeListToArray(li);
        return liArray.reduce((acc,cur)=>{
            return cur.innerHTML === letter || acc;

        },false);
    }

    /**
     * Displays passed letter on screen after a match is found
     * * @param (string) letter - Letter to display
     * */
    showMatchedLetter = (letter) =>{
        const lis = this.ul.querySelectorAll('li');
        lis.forEach(li =>{
            if(letter === li.innerHTML){
                li.className = li.className.replace("hide","show");
            }
        });
    }

    /**Convert Nodelist to array
     * 
     */
    nodeListToArray = (nodeList) =>{
        let arr = [];
        for(var i = nodeList.length; i--; arr.unshift(nodeList[i]));
        return arr;
    }

    /** show all matched letters -- for testing only
     * 
     */
    showMatchedLetterAll = () =>{
        const lis = this.ul.querySelectorAll('li');
        lis.forEach(li =>li.className = li.className.replace("hide","show"));
    }

}
