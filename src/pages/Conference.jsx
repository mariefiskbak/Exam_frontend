import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import facade from "../apiFacade.js";
import "../styles/styles.css";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import Talks from "../components/Talks.jsx";


function Conference({loggedIn}) {
    const [conferences, setConferences] = useState([])
    const [clickedConference, setClickedConference] = useState(0)
    const [show, setShow] = useState(false)


    useEffect(() => {
        facade.fetchData(`/conference/all`, setConferences, "GET")
    }, [])

    const seeTalks = (e) => {

        setShow(!show)
        console.log(e.target.value)
        setClickedConference(e.target.value)
    }


    return (
        <div>
            <div>
                <h3>Conferences</h3>
            </div>

            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Conference Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Show Talks</th>
                    </tr>
                    </thead>
                    <tbody>
                    {conferences.map((conference) => (
                        <tr key={conference.id}>
                            <td>{conference.name}</td>
                            <td>{conference.location}</td>
                            <td>{conference.capacity}</td>
                            <td>{conference.date}</td>
                            <td>{conference.time}</td>
                            <td>
                                <button onClick={seeTalks} value={conference.id}>+</button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            {show && <div>
                <Talks conferenceId={clickedConference} loggedIn={loggedIn}/>
            </div>}

        </div>
    );
}

export default Conference;