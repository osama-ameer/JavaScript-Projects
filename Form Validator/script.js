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

form.addEventListener('submit',function(e) {
    e.preventDefault();
    
    if(username.value == ''){
        showerror(username, 'Username is required!')
    }else{
        showsuccess(username)
    }

    if(email.value == ''){
        showerror(email, 'Email is required!')
    }else{
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