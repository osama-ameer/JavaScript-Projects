const curr_one = document.getElementById('currency-one');
const curr_two = document.getElementById('currency-two');
const curr_one_amount = document.getElementById('amount1');
const curr_two_amount = document.getElementById('amount2');
const flip = document.getElementById('flip');
const rate = document.getElementById('rate');
 


//function to get exchange rates by fetching API and update DOM
//https://app.exchangerate-api.com/
function calculate(){
    const currOneCode = curr_one.value;
    const currTwoCode = curr_two.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/245896f307441d7f5dc3521b/latest/${currOneCode}`)
    .then( res => res.json())
    .then( data =>{
        //get exchange rates from API
        const exchangerate = data.conversion_rates[currTwoCode];

            //display the conversion rate
            rate.innerText = `1 ${currOneCode} = ${exchangerate} ${currTwoCode}`;

            //apply conversion rate and update amount of currency two
            curr_two_amount.value = (curr_one_amount.value * exchangerate).toFixed(2);
        


    });
}


//Flip function
function Flip(){
    const temp = curr_one.value;
    curr_one.value = curr_two.value;
    curr_two.value = temp;
    calculate();

}

//Event Listeners

curr_one.addEventListener('change', calculate);
curr_two.addEventListener('change', calculate);
curr_one_amount.addEventListener('input', calculate);
curr_two_amount.addEventListener('input', calculate);
flip.addEventListener('click', Flip);

calculate();