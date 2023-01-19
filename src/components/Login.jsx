import React, {useRef, useState} from 'react';
import facade from "../apiFacade.js";
import SignUp from "./SignUp.jsx";
import {Link, useNavigate} from "react-router-dom";

function Login({setLoggedIn, setErrorMsg, setRole}) {
    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);


    const navi = useNavigate()

    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }

    // const login = (user, pass) => {
    //     facade.login(user, pass)
    //         .then(res => setLoggedIn(true))
    // }

    const login = (user, pass) => {
        facade.login(user, pass)
            .then(res => setLoggedIn(true))
            .then(() => {
                if (facade.hasUserAccess("admin")) {
                    navi("/admin")
                    setRole("admin")
                } else if (facade.hasUserAccess("user")) {
                    navi("/")
                    setRole("user")
                } else {
                    alert("Incorrect email or password, please try again.")
                }
            })

    }


    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
    }


    return (
        <div className="login-container">
            <form>
                <input onChange={onChange} type="text" placeholder="Username" id="username"/>{" "}
                <input onChange={onChange} type="password" placeholder="Password" id="password"/>
                <button onClick={performLogin} type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
