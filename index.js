// Setting Game Name
let gameName = "Guess The word";
document.title=gameName;

document.getElementById("head-title").textContent = gameName;
document.querySelector("footer").innerHTML=`${gameName} created by Basil Daboor`


let numbersOfTries = 5;
let numbersOfLetters = 6 ; 
let currentTry = 1;
let numberOfHints = 2;

let wordToGuess="";
const words = ["Create","Update","Delete","Master","School"]
wordToGuess = words[Math.floor(Math.random()*words.length)].toLowerCase();
console.log(wordToGuess);
let messageArea = document.querySelector(".message");


document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);



function generateInput (){
    const inputsContainer = document.querySelector(".inputs");

    for (let i = 1; i<=numbersOfTries ;i++){
        const tryDiv = document.createElement("div")
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i}</span>`;
        
        if(i!==1) tryDiv.classList.add("disabled-inputs")

            for (let j = 0; j < numbersOfLetters; j++) {
                const input = document.createElement("input")
                input.type="text"
                input.id=`guess-${i}-letter-${j+1}`
                input.setAttribute("maxlength","1")
                tryDiv.append(input);
            } 

        inputsContainer.appendChild(tryDiv)

}

inputsContainer.children[0].children[1].focus()

const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input")
inputsInDisabledDiv.forEach((input)=>(input.disabled = true));

const inputs = document.querySelectorAll("input")
inputs.forEach((input,index) => {

    input.addEventListener("input",function(){
        this.value=  this.value.toUpperCase();
        // console.log(index);
        const nextInput = inputs[index+1];
        if(nextInput) nextInput.focus();
    });


    input.addEventListener("keydown",function(event){
    const currentIndex = Array.from(inputs).indexOf(event.target)

        if (event.key === "ArrowRight" ){
            const nextInput = currentIndex +1;
            if ( nextInput<inputs.length)inputs[nextInput].focus();
        }

        if (event.key === "ArrowLeft" ){
            const prevInput = currentIndex -1;
            if ( prevInput >= 0)inputs[prevInput].focus();
        }

    });

})
}

const guessButton = document.querySelector(".check")
guessButton.addEventListener("click",handleGuesses)

function handleGuesses(){
    let successGuess = true
    for (let i = 1; i <= numbersOfLetters; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const letter=inputField.value.toLowerCase();
        const actualletter = wordToGuess[i-1]
        
        if(letter===actualletter)
        {
            inputField.classList.add("in-place")
        }else if ( wordToGuess.includes(letter)&& letter!=="") {
            inputField.classList.add("not-in-place")
            successGuess=false;
        }else {
            inputField.classList.add("wrong")
            successGuess=false;

        }

    }

if (successGuess) {
    messageArea.innerHTML=`You Win After <span>${currentTry}</span>  Tries`

//////////////////////////////////////////////////////
    const currentTryTnputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryTnputs.forEach((input)=>(input.disabled=true));
/////////////////////////////////////////////////////


    let allTries =document.querySelectorAll(".inputs > div")
    allTries.forEach((tryDiv)=>tryDiv.classList.add("disabled-inputs"))
    guessButton.disabled=true; 
    getHintButton.disabled = true;
}else{
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
    const currentTryTnputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryTnputs.forEach((input)=>(input.disabled=true));
    
    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input)=> (input.disabled=false) )

let element = document.querySelector(`.try-${currentTry}`)
if(element){
    document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
    element.children[1].focus();
}else{
    // this.disabled=true;   OR
    guessButton.disabled=true;
    getHintButton.disabled = true;
    messageArea.innerHTML=`You lost After <span>${currentTry-1}</span>  Tries, The word was <span> ${wordToGuess}</span>`
    console.log(wordToGuess);
    
}

}


}


function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if (numberOfHints === 0) {
        getHintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    // console.log(enabledInputs);
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    // console.log(emptyEnabledInputs);

    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
      // console.log(randomIndex);
      // console.log(randomInput);
      // console.log(indexToFill);
    if (indexToFill !== -1) {
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
    }
}




function handleBackspace(event) {
    if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
      // console.log(currentIndex);
    if (currentIndex > 0) {
        const currentInput = inputs[currentIndex];
        const prevInput = inputs[currentIndex - 1];
        currentInput.value = "";
        prevInput.value = "";
        prevInput.focus();
    }
    }
}

document.addEventListener("keydown", handleBackspace);

window.onload = function(){
    generateInput()
}
