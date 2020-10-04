const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const restartButton = document.getElementById('restart');
const popup = document.getElementById('popup-container');
const slider = document.getElementById('slider-container');
const message = document.getElementById('win-lose');

const hangmanParts = document.querySelectorAll('.hangman-part');

const wordsPool =  ['javascript', 'computer', 'hangman', 'facebook', 'youtube'];

//select any random word
let selectedWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];

//console.log(selectedWord);

//arrays to classify the input of the user
const correctedLetters = [];
const incorrect =[];

//function to display the word on the screnn

function displaySelectedWord(){

    word.innerHTML=`
        ${selectedWord
        .split('')
        .map(
            letter => `
                <span class="letter"> 
                ${correctedLetters.includes(letter) ? letter : ''}
                </span>
            `
        )

        .join('')
        }
    `;

    const wordText = word.innerText.replace(/\n/g, '');
    
    if(wordText === selectedWord ){
        message.innerText = 'You won!';
        popup.style.display= 'flex';

    }
}

//function to display the sliding notification

function showNotification(){
    slider.classList.add('show');

    setTimeout(() => { slider.classList.remove('show')} , 3000)

}


//function to update incorrect letters

function updateWrongLetters(){

    // update the display for wrong letters
    wrongLetters.innerHTML=`
        ${incorrect.length > 0 ? `<p> Wrong </p>` : ''}
        ${incorrect.map( letter => `<span>${letter}</span>`)}
        `;

        // Display Hangman Parts on Incorrect Letter Input
        hangmanParts.forEach ((part,index) => {
            const errors = incorrect.length;

            if (index < errors){
                part.style.display = 'block';
            }else{
                part.style.display = 'none';
            }
        })


        //if popup is lost
        if(incorrect.length === hangmanParts.length){
            message.innerText = 'You lost';
            popup.style.display ="flex"
        }
       
       
}

// event listeners

restartButton.addEventListener('click', () => {
    //empty arrays

    correctedLetters.splice(0);
    incorrect.splice(0);

    //get a new selected word from the pool
    let selectedWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];


    //update display
    displaySelectedWord();


    //update wrong letter div
    updateWrongLetters();

    // update popup
    popup.style.display ='none'


} )



window.addEventListener('keydown', e => {
    if( e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        

        if(selectedWord.includes(letter)){
            if(!correctedLetters.includes(letter)){
                correctedLetters.push(letter);
                displaySelectedWord();
            }else{
                showNotification();
            }
        }else{
            if(!incorrect.includes(letter)){
                incorrect.push(letter);
                updateWrongLetters();
            }else{
                showNotification();
            }
        }
    }
})

displaySelectedWord();