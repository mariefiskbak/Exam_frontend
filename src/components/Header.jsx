import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";



function Header({setErrorMsg, loggedIn, setLoggedIn, role, setRole}) {


    return (
        <nav className="topnav">

            <div className="topnavLeft">
                <p id="welcomeUser">Welcome</p>
            </div>

            <div className="topnavMid">
                <NavLink className="" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>
                {role === "admin" ? (<NavLink to="/admin"><i className="fa fa-fw fa-envelope"></i> Admin</NavLink>) : ("")}
                <NavLink to="/search"><i className="fa fa-fw fa-search"></i> Search</NavLink>
                <NavLink to="/contact"><i className="fa fa-fw fa-envelope"></i> Contact</NavLink>
            </div>

            <div className="topnavRight">
                {!loggedIn ? (<Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} setRole={setRole} />) :
                    (<div>
                        <LoggedIn setLoggedIn={setLoggedIn} setRole={setRole}/>
                    </div>)}
                <NavLink to="/signup">
                    <button className='signUp'>Sign up</button>
                </NavLink>
             
            </div>

        </nav>
    );
}

export default Header;
