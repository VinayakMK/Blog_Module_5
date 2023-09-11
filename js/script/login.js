

function validateName(){
  let nameError = document.getElementById('username-error')
  let name = document.getElementById('username')

  if(name.value.trim()==''){
      nameError.innerHTML='Username cannot be blank!'
      return false
  }
  else if(name.value.length < 5){
      nameError.innerHTML='Username must not be less than 5 characters!'
      return false
  }
  else{
      nameError.innerHTML =''
      return true
  }
}

function validatePassword(){
  let passwordError = document.getElementById('password-error')
  let password = document.getElementById('password')

  if(password.value.trim()==''){
      passwordError.innerHTML='Password cannot be blank!'
      return false
  }
  else if(password.value.length < 6 || password.value.length > 20){
      passwordError.innerHTML='Password length cannot be less than 5 characters or more than 20 characters!'
      return false
  }
  else{
      passwordError.innerHTML =''
      return true
  }
}

function validateForm(){
  let submitError = document.getElementById('submit-error')
  if( !validateName() || !validatePassword() ){
      submitError.innerHTML='Please resolve errors!'
      return false
  }
  else{
    //   submitError.innerHTML=''
    //   return true;

    window.location.href="index.html";
  }
}
