import { auth } from './firebase';
import React, { useState, useEffect } from 'react';
import '../css/signup.css';
import { Link } from 'react-router-dom';
import Home from './Home';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

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
  
  const signUp = (e) => {
    e.preventDefault();
    //create user
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
  }

  if (!user) {
    return (
      <div className="sign">
        <div className="sign__form">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
            alt="logo IG"
            className="sign__logo"/>
          <input type="text" className="sign__username sign__input" placeholder="username"
            onChange={(e) => setUsername(e.target.value)} />
          <input type="text" className="sign__email sign__input" placeholder="email"
            onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="sign__password sign__input" placeholder="password"
            onChange={(e) => setPassword(e.target.value)} />
          <button className="sign__btn" onClick={signUp} >Create account</button>
          {/*  */}
          <small>Already have an account ?</small>
          <Link className="sign__btn" to="/signin" >Login</Link>

        </div>
      </div>
    )
  }
  else {
    return (
      <Home user={user} />
    )
  } //endif
}

export default SignUp
