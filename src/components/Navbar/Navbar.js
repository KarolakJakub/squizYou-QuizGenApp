import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "./logo.png";
import { Menu } from 'semantic-ui-react'

export const Navbar = props => {

  return (
    <nav>
      <div className={styles.navbar}>
      <AppBar position="static">
      <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            {/* <NavLink
            exact
            
            to="/"
          >
            <img src={logo} />
          </NavLink>


          <NavLink
            exact
            
            to="/quizes-gen-list"
          >
    Stwórz Quiz
          </NavLink>


          <NavLink
            exact
            
            to="/quizlist"
          >
            Wyświetl Dostępne Quizy
          </NavLink>
          </IconButton>

          <NavLink>
          Wyloguj się
          </NavLink> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            sQuizYou
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        </AppBar>
      </div>
    </nav>
  );
};
