import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import logo from "./logo.png";
import styles from "./Navbar.module.css";
import { getThemeProps } from "@material-ui/styles";


const NewNavbar = (props) => {

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
              <NavLink onClick={props.onClickLogout} className={styles.navbarA} to="/">
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
