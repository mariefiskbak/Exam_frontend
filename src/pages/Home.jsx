import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import facade from "../apiFacade.js";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import Conference from "./Conference.jsx";


function Home({loggedIn, role}) {


    return (
        <div>
            {role === "admin" || role === "user" ? (
                <div>
                <Conference loggedIn={loggedIn}/>
                </div>
            ) : (
                <div>
                    Welcome. Please log in.
                </div>)}


        </div>
    )


    // const [conferences, setConferences] = useState([])
    // const [talks, setTalks] = useState([])
    //
    // useEffect(() => {
    //     facade.fetchData("/conference/all", setConferences, "GET")
    // }, [])
    //
    // const seeTalks = (evt) => {
    //     evt.preventDefault();
    //     console.log(evt.target.value)
    //     facade.fetchData(`/conference/talks/${evt.target.value}`, setTalks, "GET")
    // }
    //
    //
    // return (
    //     <div>
    //         <div>
    //             <h3>Conferences</h3>
    //         </div>
    //
    //         <div>
    //             <Table>
    //                 <thead>
    //                 <tr>
    //                     <th>Id</th>
    //                     <th>Name</th>
    //                     <th>Capacity</th>
    //                     <th>Date</th>
    //                     <th>Time</th>
    //                     <th>Talks</th>
    //                 </tr>
    //                 </thead>
    //                 <tbody>
    //                 {conferences.map((conference) => (
    //                     <tr key={conference.id}>
    //                         <td>{conference.id}</td>
    //                         <td>{conference.name}</td>
    //                         <td>{conference.capacity}</td>
    //                         {/*//TODO change to Danish format*/}
    //                         <td>{conference.date}</td>
    //                         <td>{conference.time}</td>
    //                         <td>
    //                             <button onClick={seeTalks} type="submit" value={conference.id}>See talks</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //                 </tbody>
    //             </Table>
    //         </div>
    //         <div>
    //             {!loggedIn ? (<div>ikke logget ind</div>) :
    //                 (<div>
    //                     logget ind
    //                 </div>)}
    //         </div>
    //
    //         <div>
    //             {talks.map((talk) => (
    //                 talk.name
    //             ))}
    //         </div>
    //
    //     </div>
    // );
}

export default Home;