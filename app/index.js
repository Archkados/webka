const firebaseConfig = {
  apiKey: "AIzaSyA6MvxC22gMBuQFDlf9p04LSpYRS_ecmeU",
  authDomain: "webka-68e87.firebaseapp.com",
  projectId: "webka-68e87",
  storageBucket: "webka-68e87.appspot.com",
  messagingSenderId: "994402289849",
  appId: "1:994402289849:web:eb359d4e9e70848b6f3368",
  measurementId: "G-QYVLKBF5CG"
};



firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()


function regi () {

  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  Nickname = document.getElementById('Nickname').value
  Student = document.getElementById('Student').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Где-то пустое поле! Заполните!')
    return
  
  }
  if (validate_field(full_name) == false || validate_field(Nickname) == false || validate_field(Student) == false) {
    alert('Всё еще пустоватенько!')
    return
  }
 
  
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    
    var user = auth.currentUser

   
    var database_ref = database.ref()

  
    var user_data = {
      email : email,
      full_name : full_name,
      Nickname : Nickname,
      Student : Student,
      last_login : Date.now()
    }

  
    database_ref.child('users/' + user.uid).set(user_data)

  
    alert('Пользователь создан:)')
  })
  .catch(function(error) {
   
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


function login () {
 
  email = document.getElementById('email').value
  password = document.getElementById('password').value

 
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Где-то пустое поле! Заполните!')
    return
    
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    
    var user = auth.currentUser

    
    var database_ref = database.ref()

    
    var user_data = {
      last_login : Date.now()
    }

  
    database_ref.child('users/' + user.uid).update(user_data)

    
    alert('Вошел!')

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }

  


}
