import React, {useEffect, useState} from "react";
import facade from "../apiFacade.js";
import {useNavigate} from "react-router-dom";

export default function LoggedIn({setLoggedIn, setRole}) {

    const navi = useNavigate()

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
        setRole("")
        navi("/")
    }

    return (
        <div className="login-container">
            <button onClick={logout}>Logout</button>
        </div>
    )

}