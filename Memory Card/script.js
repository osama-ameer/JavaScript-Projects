const cardContainer = document.getElementById('card-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentCard = document.getElementById('current-card');
const addCardBtn = document.getElementById('addCard');
const closeCardBtn = document.getElementById('close-card');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const clearBtn = document.getElementById('clear-btn');
const addCardContainer = document.getElementById('add-card-container');
const addNewCardBtn = document.getElementById('add-card-btn') 


//track current card
let currentCardActive = 0;

//collection of card dom elements
const cardElement = [];

//collection of card data
const cardsData = getCardsData();

//functions
//1. function to create all cards
function createCards(){
    cardsData.forEach( (data, index) => {createCard(data, index)})
}

//2. function to  create a card
function createCard(data, index){
    const card = document.createElement('div');
    card.classList.add('card');
    
    //check for first class and assign active class
    if(index === 0){
        card.classList.add('active');
    }

    card.innerHTML =`
    <div class="inner-card">
        <div class="card-front">
            <p>${data.question}</p>
        </div>
        <div class="card-back">
            <p>${data.answer}</p>
        </div>
    </div>`;

    //event listener to flip the card on click
    card.addEventListener('click', () => {
        card.classList.toggle('show-answer')
    })

    //add the newly created card to the collection of the dom elements
    cardElement.push(card);

    //add the card to the dom
    cardContainer.appendChild(card);

    //display the current card / total card value
    updateCurrentCardText()
}

//3. function to show the current card / total number of cards

function updateCurrentCardText(){
    currentCard.innerHTML = ` <p>${currentCardActive +1} / ${cardElement.length}</p> `
}

//4. get card data from local storage
function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

//5. function to save data in local storage

function saveCardData(cards){
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload();
}


createCards();

//event listeners

//1. next button event listener
nextBtn.addEventListener('click', () => {

    //hide the current card and move to left
    cardElement[currentCardActive].className = 'card left'
    //increment the current active card 
    currentCardActive++;

    //check if last card

    if(currentCardActive > cardElement.length -1){
        currentCardActive = cardElement.length -1
    }

    //display the next card
    cardElement[currentCardActive].className = 'card active'

    
    updateCurrentCardText();
})

//2. prev button event listener
prevBtn.addEventListener('click', () => {

    //hide the current card and move to left
    cardElement[currentCardActive].className = 'card right'
    //decrement the current active card 
    currentCardActive--;

    //check if last card

    if(currentCardActive < 0){
        currentCardActive = 0;
    }

    //display the next card
    cardElement[currentCardActive].className = 'card active'

    
    updateCurrentCardText();
})

//3. add new card button
addCardBtn.addEventListener('click', () => {
    addCardContainer.classList.add('show')
})

//4. close the add new card form

closeCardBtn.addEventListener('click', () => {
    addCardContainer.classList.remove('show')

  
})

//5. event listener for new card

addNewCardBtn.addEventListener( 'click', () => {
    const questionInput = question.value;
    const answerInput = answer.value;

    //check inputs are not null
    if( questionInput.trim() && answerInput.trim() ){
        const newCard = { question: questionInput, answer: answerInput }
        //using the newcard object create a cardElement using createCards function
        createCard(newCard);

        question.value =  '';
        answer.value = '';
    
        //hide form after submit
        addCardContainer.classList.remove('show');
    
        //add the new card object to the card object
        cardsData.push(newCard);
    
        //save data to local storage and reload
        saveCardData(cardsData);
    }

   

})

//6. event listener to clear all cards

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardContainer.innerHTML = '';
    window.location.reload;
    currentCard.innerHTML = `<p></p>`
})