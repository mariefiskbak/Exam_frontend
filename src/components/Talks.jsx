import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import facade from "../apiFacade.js";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";


function Talks({loggedIn, conferenceId}) {
    const [talks, setTalks] = useState([])

    useEffect(() => {
        console.log(conferenceId)
        facade.fetchData(`/conference/talks/${conferenceId}`, setTalks, "GET")
    }, [])




    return (
        <div>
            <div>
                <h3>Talks</h3>
            </div>

            <div>
                <Table>
                    <thead>
                    <tr>
                        {/*<th>Number</th>*/}
                        <th>Topic</th>
                        <th>Duration</th>
                        <th>Props list</th>
                    </tr>
                    </thead>
                    <tbody>
                    {talks.map((talk) => (
                        <tr key={talk.id}>
                            {/*<td>{number}</td>*/}
                            <td>{talk.topic}</td>
                            <td>{talk.duration} min</td>
                            <td>{talk.propsList}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            <div>
                {talks.map((talk) => (
                    talk.name
                ))}
            </div>

        </div>
    );
}

export default Talks;