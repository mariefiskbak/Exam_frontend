import React, {useEffect, useState} from 'react';
import {Modal, Table} from 'react-bootstrap';
import facade from "../apiFacade.js";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import Conference from "./Conference.jsx";


function Home({loggedIn, role}) {


    return (
        <div className="page">
            {role === "admin" || role === "user" ? (
                <div>
                <Conference loggedIn={loggedIn}/>
                {/*    <Modaltest />*/}
                </div>
            ) : (
                <div>
                    Welcome. Please log in.
                </div>)}


        </div>
    )

}

export default Home;