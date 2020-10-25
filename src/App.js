import React,{useState, useEffect} from 'react';
import fire from './firebase_config';
import './App.css';
import Login from './components/Login';
import Hero from './components/Hero'; 

function App() {

  // Setting up useStates
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)



  // Function to clear the inputs
  const clearInputs = () => {
    setEmail("")
    setPassword("")
  }


  // Function to clear errors
  const clearErrors = () => {
    setEmailError("")
    setPasswordError("")
  }


  // Function to handle login
  const handleLogin = () => {

    // Before an activity, we are going to clear the errors
    clearErrors();

    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message)
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
  }


  // Function to handle Signup
  const handleSignup = () => {

    // Before an activity, we are going to clear the errors
    clearErrors();
   fire
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .catch(err => {
       switch (err.code) {
         case "auth/email-already-in-use":
         case "auth/invalid-email":
           setEmailError(err.message)
           break;
         case "auth/weak-password":
           setPasswordError(err.message);
           break;
       }
     })
  }



  // Function to handle Logout
  const handleLogOut = () => {
    fire.auth().signOut();
  }

// Function to check whether user is logged in or out
  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user){
        // /If user, we make sure that the inputs are cleared or empty
        clearInputs();
        setUser(user)
      }else {
        setUser("")
      }
    })
  }



  // Setting up useEffect
  useEffect(() => {
    authListener()
  }, [])


  return (
    <div className='App'>
      {user ? (<Hero handleLogOut={handleLogOut} />)
      :
      (
        <Login email={email} setPassword={setPassword} password={password} setEmail={setEmail} handleLogin={handleLogin} hasAccount={hasAccount} setHasAccount={setHasAccount} emailError={emailError} handleSignup={handleSignup} passwordError={passwordError} />
      )}

      
    </div>
  );
}

export default App;
