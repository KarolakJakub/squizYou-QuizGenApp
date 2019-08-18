import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import styles from "./Navbar.module.css";
import {signOutWithFirebase, checkCurrentUserWithAlerts} from '../../services/AuthService'
import firebase from 'firebase'


const NewNavbar = (props) => {

  const handleLogout = () => {
    props.onClickLogout()
  }

  return (
    <div className={styles.navbar}>
      <Menu pointing secondary>
        <Container>
          <NavLink exact className={styles.navbarA} activeClassName={styles.activeLink} to="/">
            <Menu.Item name="Witamy!" />
          </NavLink>
          {props.isLoggedIn ?
            <>
              <NavLink className={styles.navbarA} activeClassName={styles.activeLink} to="/quizes-gen-list">
                <Menu.Item name="Nowy Quiz" />
              </NavLink>
              <NavLink className={styles.navbarA} activeClassName={styles.activeLink} to="/quizlist">
                <Menu.Item name="Twoje Quizy" />
              </NavLink>
              <NavLink onClick={handleLogout} className={styles.navbarA} to="/">
                <Menu.Item name="Wyloguj" />
              </NavLink>
            </>
            : null

          }
        </Container>
      </Menu>
    </div>
  );
};

export default NewNavbar;
