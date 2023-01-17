import React, {useState} from 'react';
import facade from "../apiFacade.js";

function SignUp({setLoggedIn}) {
    const init = {username: "", password: "", rPassword: ""};
    const [signUpInfo, setSignUpInfo] = useState(init);


    const createUser = (evt) => {
        evt.preventDefault();
        if (signUpInfo.password === signUpInfo.rPassword) {

            facade.createUser(signUpInfo.username, signUpInfo.password, signUpInfo.rPassword)
                .then(() => {
                    facade.login(signUpInfo.username, signUpInfo.password).then(() => setLoggedIn(true));
                    setSignUpInfo({username: "", password: "", rPassword: ""})
                })
                .catch(err => {
                    if (err.status) {
                        err.fullError.then(e => console.log(e.message))
                    } else {
                        console.log("Network Error");
                    }
                })
        } else {
            console.log("noget gik galt") //TODO, giv brugeren en besked
        }
    }

    const onChange = (evt) => {
        setSignUpInfo({...signUpInfo, [evt.target.id]: evt.target.value})
    }

    return (
        <div>
            <h2>Sign up</h2>
            <form>
                <input onChange={onChange} type="text" placeholder="User Name" id="username"
                       value={signUpInfo.username}/>
                <input onChange={onChange} type="password" placeholder="Password" id="password"
                       value={signUpInfo.password}/>
                <input onChange={onChange} type="password" placeholder="Repeat password" id="rPassword"
                       value={signUpInfo.rPassword}/>
                <button onClick={createUser} type="submit">Sign Up</button>
            </form>
        </div>
    );
}


//TODO besked om at man er oprettet

export default SignUp;
