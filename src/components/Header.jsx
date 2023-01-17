import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";



function Header({setErrorMsg, loggedIn, setLoggedIn}) {


    return (
        <nav className="topnav">

            <div className="topnavLeft">
                <p id="welcomeUser">Welcome</p>
            </div>

            <div className="topnavMid">
                <NavLink className="" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>
                <NavLink to="/search"><i className="fa fa-fw fa-search"></i> Search</NavLink>
                <NavLink to="/contact"><i className="fa fa-fw fa-envelope"></i> Contact</NavLink>
                <NavLink to="/pokemon"><i className="fa fa-fw fa-envelope"></i> Pokemon</NavLink>
            </div>

            <div className="topnavRight">
                {!loggedIn ? (<Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg}  />) :
                    (<div>
                        <LoggedIn setLoggedIn={setLoggedIn}/>
                    </div>)}
                <NavLink to="/signup">
                    <button className='signUp'>Sign up</button>
                </NavLink>
             
            </div>

        </nav>
    );
}

export default Header;
