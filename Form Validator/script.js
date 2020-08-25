const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



function showerror(input, message){
    const formControl = input.parentElement;
       formControl.className = 'form-control error';
       const small = formControl.querySelector('small')
       small.innerText = message;

}

function showsuccess(input){
    const formControl = input.parentElement;
       formControl.className = 'form-control success';
      

}

function isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


form.addEventListener('submit',function(e) {
    e.preventDefault();
    
    if(username.value == ''){
        showerror(username, 'Username is required!')
    }else{
        showsuccess(username)
    }

    if(email.value == ''){
        showerror(email, 'Email is required!')
    } else if (!isValidEmail(email.value)) {
        showerror(email, "Email is not valid")
    } 
    else{
        showsuccess(email)
    }


    if(password.value == ''){
        showerror(password, 'Password is required!')
    }else{
        showsuccess(password)
    }

    if(password2.value == ''){
        showerror(password2, 'Confirm Password is required!')
    }else{
        showsuccess(password2)
    }
})