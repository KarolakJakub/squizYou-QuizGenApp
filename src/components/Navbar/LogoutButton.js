import React from 'react'
import { NavLink } from "react-router-dom";
import { Button } from '@material-ui/core';
import './LogoutButtonStyles.css'

export default function LogoutButton(props) {

    return (
        <>
            {props.isLoggedIn ?
                <NavLink
                    onClick={props.onClickLogout}
                    to="/"
                    className={"logout-button"}
                    activeClassName={"active-link"}

                >
                    <button className={'logoutButton'}>WYLOGUJ SIĘ</button>
                </NavLink>
                : null}
        </>
    )
}
