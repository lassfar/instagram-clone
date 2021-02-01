import React from 'react';
import '../css/header.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';

function Header({user}) {
  let history = useHistory();
  const logOut = () => {
    auth.signOut();
    history.push({pathname: "/signin"});
  }
  
  return (
    <div className="header">
      <img className="header__img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" />
      <input type="text" className="header__searchInput" placeholder="search" />
      <div className="header__links">
        <Link className="header__item" to="#">
          <i className="material-icons">home</i>
        </Link>
        <Link className="header__item" to="#">
          <i className="material-icons">send</i>
        </Link>
        <Link className="header__item" to="#">
          <i className="material-icons">explore</i>
        </Link>
        <Link className="header__item" to="#">
          <i className="material-icons">favorite_border</i>
        </Link>
        <Link className="header__item" to="#" onClick={logOut}>
          <i className="material-icons">power_settings_new</i>
        </Link>
        <Link className="header__item" to="#">
          {user?.displayName}
        </Link>
        <span></span>
      </div>
    </div>
  )
}

export default Header
