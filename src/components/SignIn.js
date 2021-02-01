import { auth } from './firebase';
import React, { useState, useEffect } from 'react';
import '../css/signup.css';
import { Link } from 'react-router-dom';
import Home from './Home';
import Header from './Header';

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user has logged in
        setUser(authUser);
        console.log(authUser);
      }
      else {
        setUser(null)
      }
    });
    return () => {
      // cleanup useEffect
      unsubscribe();
    }
  }, [user, username])
  
  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
  }

  if (!user) {
    return (
      <div className="sign">
        <div className="sign__form">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
            alt="logo IG"
            className="sign__logo"/>
          <input type="text" className="sign__email sign__input" placeholder="email"
            onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="sign__password sign__input" placeholder="password"
            onChange={(e) => setPassword(e.target.value)} />
          <button className="sign__btn" onClick={signIn} >Login</button>
          {/*  */}
          <small>Don't have an account ?</small>
          <Link className="sign__btn" to="/signup" >Sign Up</Link>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <Header user={user} />
        <Home user={user} />
      </div>
    )
  } //endif
}

export default SignIn
