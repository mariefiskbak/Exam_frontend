import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import facade from "../apiFacade.js";

function Admin(){

    const [conference, setConference] = useState({name: "", location: "", capacity: "", date: "", time: ""})

    const onCChange = (evt) => {
        setConference({...conference, [evt.target.id]: evt.target.value})
    }

    // const conferenceForm =

const createConference = (evt) => {
    evt.preventDefault();
    console.log(conference.name)
    console.log(conference.location)
    console.log(conference.capacity)
    console.log(conference.date)
    console.log(conference.time)
    facade.createConference(conference.name, conference.location, conference.capacity, conference.date, conference.time)
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => console.log(e.message))
            } else {
                console.log("Network Error");
            }
        })
    // facade.fetchData("conference/newconference", () => alert("Conference created succesfully"), "POST", conference)
}

    return(
        <div>
            <div>
                {/*<Button onClick={conferenceForm}>+</Button> Conference*/}
                <div id="form">
                    <form onSubmit={createConference}>
                        <span>Conference Name</span>
                        <input placeholder="Name" type="text" id="name" value={conference.name} onChange={onCChange}/>

                        <span>Location</span>
                        <input placeholder="Location" type="text" id="location" value={conference.location} onChange={onCChange}/>

                        <span>Capacity</span>
                        <input type="number" id="capacity" value={conference.capacity} onChange={onCChange}/>

                        <span>Date</span>
                        <input type="date" id="date" value={conference.date} onChange={onCChange}/>

                        <span>Time</span>
                        <input type="time" id="time" value={conference.time} onChange={onCChange}/>

                        <button type="submit">Submit</button>

                    </form>
                </div>
                <br/>
                <Button>+</Button> Talk
                <br/>
                <Button>+</Button> Speaker
            </div>
        </div>
    )
}
export default Admin