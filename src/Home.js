import React, { useState } from 'react';
import './Home.css';
import { } from '@material-ui/core/'
import SignUp from '../src/components/Auth/SignUp'
import SignIn from '../src/components/Auth/SignIn'
import logo from './components/Navbar/logo.png'
import { Container } from "semantic-ui-react";
import { NavLink } from "react-router-dom";


export default function Home(props) {
  const { onLogin, userName, isLoggedIn } = props



  function onLoginFromHome() {

    onLogin()
    
  }


  return <Container>
    <div className={isLoggedIn ? 'titlePageLoggedIn' : 'titlePage'}>


      {isLoggedIn ?
        <div className='welcomeTitle'>
          <>
            <div className="infoOnMainPageLoggedIn">
            <img src={logo} />
            <h2>Witaj {userName}!</h2>
              <p>Przejdź do zakładki <NavLink to='/quizes-gen-list'><b>NOWY QUIZ</b></NavLink>, aby dodać nowy quiz</p>
              <p>lub</p>
              <p>Przejdź do zakładki <NavLink to='/quizlist'><b>TWOJE QUIZY</b></NavLink>, aby rozwiązać już istniejący quiz</p>
            </div>
          </>
        </div>
        :

        <>



          <div className="infoOnMainPage">
            <img src={logo} />
            <p><b>ZALOGUJ</b> lub <b>ZAREJESTRUJ SIĘ</b>, aby korzystać z serwisu.</p>


          </div>
          <SignIn onLogin={onLoginFromHome} isLoggedIn={props.isLoggedIn}></SignIn>
          <div></div>

          <SignUp onLogin={onLoginFromHome} isLoggedIn={props.isLoggedIn}></SignUp>
        </>
      }
    </div>

  </Container>
};

