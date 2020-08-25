const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//function to show errorr 
function showerror(input, message){
    const formControl = input.parentElement;
       formControl.className = 'form-control error';
       const small = formControl.querySelector('small')
       small.innerText = message;

}

//function to show success

function showsuccess(input){
    const formControl = input.parentElement;
       formControl.className = 'form-control success';
      

}


//function to check email
function isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



//function to validate every input field
function checkRequired(inputArray){
    inputArray.forEach(e => {
        if (e.value === ''){
            showerror(e, `${getFieldId(e)} is required`);
        }
        else{
            showsuccess(e);
        }
        
    });

}

//function to get the name of the input field
function getFieldId(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//event on sumbit button
form.addEventListener('submit',function(e) {
    e.preventDefault();
    

    checkRequired([username, email, password, password2]);
   
})