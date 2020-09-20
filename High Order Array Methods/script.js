const main = document.getElementById('main');
const adduserbutton = document.getElementById('add-user');
const doublemoney = document.getElementById('double');
const showmillionaire = document.getElementById('show-millionaires');
const sortbtn = document.getElementById('sort');
const calculateTotal = document.getElementById('calculate-total');

let data = [];

//functin to fetch random user
// used https://randomuser.me/api/

generateRandomUser();
generateRandomUser();
generateRandomUser();

//functin to fetch random user
// used https://randomuser.me/api/

async function generateRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    
    const user = data.results[0];
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}` ,
        worth: Math.round(Math.random()*1000000)
    };

    addData(newUser);

}

//function to double worth

function doubleworth(){
    data = data.map( item => {
        return {...item, worth: item.worth * 2}
    })

    updateDOM();
}

//funtion to sort richest

function sortRichest(){
    data.sort( (a, b) => b.worth - a.worth);

    updateDOM();
}

//funtion to filter show millionaires

function showMillionaire(){
    data = data.filter(
        item => item.worth > 1000000
    );

    updateDOM();
}

//function to calculate total worth

function totalWealth(){
    const total = data.reduce(
        (acc, item) => (acc+= item.worth), 0
    );

    const TOTALWORTH = document.createElement('div');
    TOTALWORTH.innerHTML = `<h3> Total Net Worth: <strong>${formatCurrency (total)}</strong></h3>`
    main.appendChild(TOTALWORTH);
}


// Add new users to array
function addData(newUser){
    data.push(newUser);

    updateDOM();
}

//function to update UI

function updateDOM(inputdata = data){

    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>';
    
    inputdata.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        main.appendChild(element);
    });
}

function formatCurrency(num) {
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//Event Listeners

adduserbutton.addEventListener('click',generateRandomUser);
doublemoney.addEventListener('click', doubleworth);
sortbtn.addEventListener('click', sortRichest);
showmillionaire.addEventListener('click', showMillionaire);
calculateTotal.addEventListener('click',totalWealth);