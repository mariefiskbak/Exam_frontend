import BASE_URL from "./settings.js";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }
  const loggedIn = () => {
    return getToken() != null;
  }
  const logout = () => {
    localStorage.removeItem("jwtToken");
    document.querySelector("#welcomeUser").innerHTML = `Welcome`
  }

  const isLoggedIn = () => {
    return getToken() != null
  }

  const getUserRoles = () => {
    const token = getToken()
    if(token != null) {
      const payloadBase64 = getToken().split('.')[1]
      const decodedClaims = JSON.parse(window.atob(payloadBase64))
      return decodedClaims.roles
    } else return ""
  }

  const hasUserAccess = (neededRole) => {
    const roles = getUserRoles().split(",")
    return isLoggedIn() && roles.includes(neededRole)
  }
  
 

  const login = (user, password) => {
    const opts = makeOptions("POST", true, {username: user, password: password})
    return fetch(BASE_URL + "/login", opts)
      .then(handleHttpErrors)
      .then(res => {
        document.querySelector("#welcomeUser").innerHTML = `Welcome, ${user}`
        setToken(res.token);
      })
  }

  const createUser = (user, password, rPassword) => {
    const opts = makeOptions("POST", false, {userName: user, userPass: password})
    return fetch(BASE_URL + "/user/signup", opts)
        .then(handleHttpErrors)
  }


  const handleHttpErrors = (res) => {
    if(!res.ok) {
      return Promise.reject({status: res.status, fullError: res.json()})
    }
    return res.json()
  }

  const handleErrors = (err, setErrorMessage) => {
    if(err.status) {
      err.fullError.then(e => {
        console.error(e.message)
        if (setErrorMessage) {
          setErrorMessage(err.code + ": " + err.message)
        }
      })
    } else {
      console.log("Network Error")
      console.error(err)
    }
  }

  const fetchData = async (endpoint, updateAction, method, body, setErrorMessage) => {
    const opts = makeOptions(method, true, body)
    try {
      const res = await fetch(BASE_URL + endpoint, opts)
      const data = await handleHttpErrors(res)
      return updateAction(data)
    } catch(err) {
      handleErrors(err, setErrorMessage)
    }
  }

  // const fetchData = () => {
  //   const opts = makeOptions("GET", true)
  //   return fetch(BASE_URL + "/info/user", opts).then(handleHttpErrors)
  // }
  const makeOptions= (method, addToken, body) => {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
  const createConference = (name, location, capacity, date, time) => {
    const opts = makeOptions("POST", false, {
      name: name,
      location: location,
      capacity: capacity,
      date: date,
      time: time
    })
    // return fetch(BASE_URL + "/conference/newconference", {...opts, mode: 'no-cors'})
    return fetch(BASE_URL + "/conference/newconference", opts)
        .then(handleHttpErrors)

  }


  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    createUser,
    fetchData,
    hasUserAccess,
    createConference
  }
}
const facade = apiFacade();
export default facade;
