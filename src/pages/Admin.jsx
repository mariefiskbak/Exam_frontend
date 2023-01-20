import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import facade from "../apiFacade.js";
import Talks from "../components/Talks.jsx";
import AllTalks from "../components/AllTalks.jsx";

function Admin() {
    const init = {name: "", location: "", capacity: "", date: "", time: ""}
    const [conference, setConference] = useState(init)
    const [talks, setTalks] = useState([])
    const [showAllTalks, setShowAllTalks] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)

    useEffect(()=> {

        }, [shouldUpdate])

    const onCChange = (evt) => {
        setConference({...conference, [evt.target.id]: evt.target.value})
    }

    const handleClick = (entity) => {
        if (entity === "talks") {
            facade.fetchData(`/conference/alltalks`, setTalks, "GET")
            setShowAllTalks(true)
        }
    }

    // const conferenceForm =

    const createConference = (evt) => {
        evt.preventDefault();
        facade.fetchData("/conference/newconference", () => alert("Conference created succesfully"), "POST", conference)
        setConference(init)
    }

    return (
        <div className="page">
            <div>
                <h3>Create new entity</h3>
                {/*<Button onClick={conferenceForm}>+</Button> Conference*/}
                <div id="form">
                    <form onSubmit={createConference} id="form">
                        <span>Conference Name</span>
                        <input placeholder="Name" type="text" id="name" value={conference.name} onChange={onCChange}/>

                        <span>Location</span>
                        <input placeholder="Location" type="text" id="location" value={conference.location}
                               onChange={onCChange}/>

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

            <div>
                <h3>Update or delete entities</h3>
                <div>
                    <a href="#" onClick={() => handleClick("talks")}>Show all Talks</a> <br/>
                    {showAllTalks && <AllTalks talks={talks} shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate}/>}
                    <a href="#" onClick={() => handleClick("conferences")}>Show all Conferences</a> <br/>
                    <a href="#" onClick={() => handleClick("speakers")}>Show all Speakers</a>
                </div>
            </div>
        </div>
    )
}

export default Admin