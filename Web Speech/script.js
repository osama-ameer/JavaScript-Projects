//main element for the grid

const main = document.getElementById('main');

//select box for changing voices
const voiceSelect = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');

const data = [
    {
        image: './img/angry.jpg',
        text:"I'm angry"
    },
    {
        image: './img/drink.jpg',
        text:"I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text:"I want to eat food"
    },
    {
        image: './img/grandma.jpg',
        text:"I love my granma"
    },
    {
        image: './img/happy.jpg',
        text:"I'm happy"
    },
    {
        image: './img/home.jpg',
        text:"I want to go home"
    },
    {
        image: './img/hurt.jpg',
        text:"I'm hurt"
    },
    {
        image: './img/outside.jpg',
        text:"I want to go outside"
    },
    {
        image: './img/scared.jpg',
        text:"I'm scared"
    },
    {
        image: './img/sad.jpg',
        text:"I'm sad"
    },
    {
        image: './img/school.jpg',
        text:"I want to go to school"
    },
    {
        image: './img/tired.jpg',
        text:"I'm tired"
    }
]

//array for all web speeches api

// let voices = [];

//create a box for each object in the data array

data.forEach(createBox);

//functions
//1. function to create speech boxes

function createBox(imageObj){
    const box = document.createElement('div');
    //get the image url and text from the data array

    const {image, text} = imageObj;

    //apply the css class to the new div
    box.classList.add('box');
    box.innerHTML=`
    <img src="${image}" alt="${text}" />
    <p class="imageInfo"> ${text} </p>
    `;

    // add event for speaking text
    box.addEventListener('click', () => {
        setMessage(text);
        speakText(text)
    })
    

    //add the new box to the dom

    main.appendChild(box)
}

// Initialize speech synthesis
const message = new SpeechSynthesisUtterance();

//function to get voices from web speech api and put into select box

// function getVoices(){
//     //get voices from web speech api
//     voices = speechSynthesis.getVoices();

//     voices.forEach( (voice) => {
//         //create an option element

//         const option = document.createElement('option');
//         //give option value
//         option.value = voice.name;

//         option.innerText=`
//         ${voice.name} ${voice.lang}
//         `;

//         //add to dom
//         selectVoices.appendChild(option)
//     })
    

// }
//2. 
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
  
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
  
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

//execute function
  populateVoiceList();

if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}


// 3. Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}


// 4. To speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// 5. Function to set the new voice
function setVoice(e) {
    console.log(e.target.value);
    message.voice = voicesBackup.find(voice => voice.name === e.target.value);
}


//event lsteners

//1. toggle btn 

toggleBtn.addEventListener('click', () => {
    document.getElementById('custom-text').classList.add('show');
})

//2. close btn in custom text div

closeBtn.addEventListener( 'click', () => {
    document.getElementById('custom-text').classList.remove('show');

})

//3. event listeners for changing voices

speechSynthesis.addEventListener('voiceschanged', populateVoiceList)

readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})


