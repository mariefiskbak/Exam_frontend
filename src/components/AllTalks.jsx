import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import facade from "../apiFacade.js";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import Modal from 'react-modal';
import "../styles/styles.css"


let talkId = 0

function AllTalks({talks, shouldUpdate, setShouldUpdate}) {
    const [isOpen, setIsOpen] = useState(false);
    const [addSpeaker, setAddSpeaker] = useState("")
    const [editTalk, setEditTalk] = useState({topic: "", duration: 0, propsList: ""} )
    const [editTalkSpeaker, setEditTalkSpeaker] = useState({...editTalk, speakers: [ {id: addSpeaker } ] } )
    const [speakers, setSpeakers] = useState([])


    useEffect(() => {
        facade.fetchData(`/conference/allspeakers`, setSpeakers, "GET")
    }, [])

    const getTheTalk = (e) => {
        facade.fetchData(`/conference/talkid/${e.target.value}`, setEditTalk, "GET")
        talkId = e.target.value
        console.log(talkId)
        openModal()
    }


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false)
    }

    // const editTalk = (talkId) => {
    //
    // }

    const customStyles = {
        content: {
            top: '10%',
            left: "25%",
            right: 'auto',
            bottom: 'auto',
            width: "50%",
            overflowY: "none"
        },
    };

    const updateTalk = (evt) => {
        console.log("addSpeaker")
        console.log(addSpeaker)
        setEditTalkSpeaker({...editTalk, speakers: [ {id: addSpeaker } ] })
        // evt.preventDefault()
        console.log("talkId")
        console.log({talkId})
        facade.fetchData(`/conference/updatetalk/${talkId}`, () => alert("Talk updated successfully"), "PUT", {...editTalk, speakers: [ {id: addSpeaker } ] })
    }

    const deleteTalk = (evt) => {
        //TODO are-you-sure-step
        facade.fetchData(`/conference/deletetalk/${evt.target.value}`,  () => alert("Talk deleted successfully"), "DELETE")
            .then(() => {
                setShouldUpdate(!shouldUpdate)
        })

    }

    const onChange = (evt) => {
        setEditTalk({...editTalk, [evt.target.id]: evt.target.value})
    }

    return (
        <div>
            <div>
                <h3>All Talks</h3>
            </div>

            <div>
                <Table>
                    <thead>
                    <tr>
                        {/*<th>Number</th>*/}
                        <th>Topic</th>
                        <th>Duration</th>
                        <th>Props list</th>
                        <th>Speakers</th>
                        <th>Conference</th>
                        <th>Edit</th>
                        <th>Delete talk</th>
                    </tr>
                    </thead>
                    <tbody>
                    {talks.map((talk) => (
                        <tr key={talk.id}>
                            {/*<td>{number}</td>*/}
                            <td>{talk.topic}</td>
                            <td>{talk.duration} min</td>
                            <td>{talk.propsList}</td>
                            <td>{talk.speakers.map((speaker) => (speaker.name + " "))}</td>
                            <td>{talk.conference.name}</td>
                            <td>
                                <button onClick={getTheTalk} value={talk.id}>Select</button>
                            </td>
                            <td>
                                <button onClick={deleteTalk} value={talk.id}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <button onClick={closeModal}>close</button>
                <div id="modalToBe">
                    <form onSubmit={updateTalk}>

                        <span>Topic</span>
                        <input placeholder={editTalk.topic} type="text" id="topic" value={editTalk.topic}
                               onChange={onChange}/>
                        <span>Duration (min)</span>
                        <input placeholder={editTalk.duration} type="number" id="duration" value={editTalk.duration}
                               onChange={onChange}/>
                        <span>Props list</span>
                        <input placeholder={editTalk.propsList} type="text" id="propsList" value={editTalk.propsList}
                               onChange={onChange}/>

                        <label>
                            Add speaker:
                            <select
                                value={addSpeaker}
                                onChange={(event) => setAddSpeaker(event.target.value)}
                            >
                                {speakers.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        //TODO speakers and conference


                        <button type="submit">Submit</button>

                    </form>

                </div>

            </Modal>
        </div>
    );
}

export default AllTalks;