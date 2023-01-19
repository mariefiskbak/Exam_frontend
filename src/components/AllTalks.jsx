import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import facade from "../apiFacade.js";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import Modal from 'react-modal';
import "../styles/styles.css"


function AllTalks({talks}) {
    const [isOpen, setIsOpen] = useState(false);
    const [editTalk, setEditTalk] = useState({topic: "", duration: 0, propsList: ""})

    let talkId = 0


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
        evt.preventDefault()
        console.log("talkId")
        console.log({talkId})
        facade.fetchData(`/conference/updatetalk/${talkId}`, () => alert("Talk updated successfully"), "PUT", editTalk)
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
                        //TODO speakers and conference


                        <button type="submit">Submit</button>

                    </form>

                </div>

            </Modal>
        </div>
    );
}

export default AllTalks;