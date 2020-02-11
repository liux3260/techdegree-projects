/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * `quotes` array that contains 6 quotes with 5 properties
 * quote: string - the actual quote
 * source: string - the person or character who said it
 * citation: string - reference to the source of the quote
 * year: string / number - the year the quote originated
 * tag: string - categorize a quote
***/
var quotes = [{quote:'Moral indignation is jealousy with a halo.',source:'H. G. Wells',citation:'The Wife of Sir Isaac Harman',year:'1917',tag:'Morality'},
{quote:'The evil that men do lives after them; the good is oft interred with their bones.',source:'William Shakespeare',citation:'Julius Caesar',year:1599,tag:'Reputation'},
{quote:'The whole problem with the world is that fools and fanatics are always so certain of themselves, and wiser people so full of doubts.',source:'Bertrand Russell',tag:'Wisdom'},
{quote:'His ignorance is encyclopedic',source:'Abba Eban',tag:'Ignorance'},
{quote:'If a man does his best, what else is there?',source:'General George S. Patton',tag:''},
{quote:'Political correctness is tyranny with manners.',source:'Charlton Heston',tag:'Political'}]

setInterval(printQuote,10000);
/***
 * `getRandomQuote` function that generates random number between 0 and 5
 * output: All the information of a quote.
***/
function getRandomQuote(){
  var rand = Math.floor( Math.random()*quotes.length);
  return quotes[rand];

}


/***
 * `printQuote` function that transform the quote to html
***/
function printQuote(){

  var randomQuote = getRandomQuote();
  var html = '<p class="quote">' + randomQuote.quote + '</p> \n <p class="source">' + randomQuote.source;
  if(randomQuote.citation){
    html += '<span class="citation"> ' + randomQuote.citation + '</span>\n';
  }
  if(randomQuote.year){
    html += '<span class="citation"> ' + randomQuote.year + '</span>\n';
  }
  if(randomQuote.tag){
    html += '<span class="citation"> ' + randomQuote.tag + '</span>\n';
  }
  html += '</p>';
  getRandomColor();
  document.getElementById('quote-box').innerHTML = html; 
}

/***
 * `getRandomColor` function that randomly changes background color
***/
function getRandomColor() {
  var randomColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";

  document.body.style.background = randomColor;
  }

/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);