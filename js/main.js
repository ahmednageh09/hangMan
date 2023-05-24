const letters = "abcdefghijklmnuopqrstvwxyz";

let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

const words = {
      programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
      movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento","Coco", "Up"], 
      people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"], 
      countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};
// select a random key
let allKeys = Object.keys(words);
// the index of the random key out of the  keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// the name of that key.. the category 
let randomPropName = allKeys[randomPropNumber];
// the category words
let randomPropValue = words[randomPropName];
// a random value of that category depend on its length
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// the name of that selected value 
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info span").innerHTML =  randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

let letterAndSpace = Array.from(randomValueValue);
letterAndSpace.forEach(letter => {
    let emptySpan = document.createElement('span');
    if(letter == ' '){
        emptySpan.className = "with-space";
    }
    lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDraw = document.querySelector('.hangman-draw');

document.addEventListener("click", (e) => {
    let status = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        
        let clickedLetter = e.target.innerHTML.toLowerCase();
        let chosenLetter = Array.from(randomValueValue.toLowerCase());
        
        chosenLetter.forEach((wordLetter,wordIndex) => {
            if (clickedLetter == wordLetter) {
                 status = true;
                 guessSpans.forEach((span,spanIndex) => {
                     if (wordIndex === spanIndex) {
                         span.innerHTML = clickedLetter;
                     }
                 });
            }
        });
        
function checkGuessSpans() {
  let filledSpans = Array.from(guessSpans).filter(span => span.innerHTML !== "");
  if (filledSpans.length === guessSpans.length) {
    lettersContainer.classList.add("finished");
    let div = document.createElement("div");
    let btn = document.createElement("button");
    let text = document.createTextNode("Great, Your Guess is correct!");
    div.appendChild(text);
    let btnText = document.createTextNode("Play Again");
    div.className = "popup";
    btn.className = "playBtn";
    btn.appendChild(btnText);
    div.appendChild(btn);
    document.body.appendChild(div);
    playAgain();    
  }
}
       
        if (status !== true) {
            wrongAttempts ++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            document.getElementById("fail").play();
            
            if (wrongAttempts === 8 ) {
            endGame();
            lettersContainer.classList.add("finished");
            }
       } else {

      // Play Success Sound
      document.getElementById("success").play();
      checkGuessSpans()
    }

  }

});

function endGame() {
    let div = document.createElement("div");
    let btn = document.createElement("button");
    let text = document.createTextNode(`Game Over, The word is ${randomValueValue}`);
    div.appendChild(text);
    div.className = "popup";
    btn.className = "playBtn";
    let btnText = document.createTextNode("Play Again");
    btn.appendChild(btnText);
    div.appendChild(btn);
    document.body.appendChild(div);
    playAgain();
}

function playAgain() {
    document.addEventListener("click", (e) => {
        if (e.target.className === 'playBtn') {
            let hide = document.querySelector('.popup');
            hide.classList.add("disappear");
            location.reload();
        }
    });
    
}
