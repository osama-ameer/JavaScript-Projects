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
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showsuccess(input);
    } else{
        showerror(input, `${getFieldId(input)} is not valid.`)
    }
}



//function to validate every input field
function checkRequired(inputArray){
    inputArray.forEach(input => {
        if (input.value === ''){
            showerror(input, `${getFieldId(input)} is required`);
        }
        else{
            showsuccess(input);
        }
        
    });

}

//function to check length

function checkLength(input,min,max){
    if(input.value.length < min){
        showerror(input, `${getFieldId(input)} must be atleat ${min} characters.` );
    } else if( input.value.length > max){
        showerror(input, `${getFieldId(input)} must be less than ${max} characters.` );
    } else {
        showsuccess(input);
    }

}

//fuction to check password and confirm password
function checkPassMatch(input1,input2){
    if(input1.value !== input2.value){
        showerror(input2, 'Password not matched!')
    } 
}

//function to get the name of the input field
function getFieldId(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



//event on sumbit button
form.addEventListener('submit',function(e) {
    e.preventDefault();
    

    checkRequired([username, email, password, password2]);
    checkLength(username,3,20);
    checkLength(password,6,30);
    checkEmail(email);
    checkPassMatch(password, password2)

   
})