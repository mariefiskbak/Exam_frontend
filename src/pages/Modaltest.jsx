import React, { useState } from "react";
import "../styles/styles.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const data = [
    {
        id: 1001,
        firstname: "Mark",
        lastname: "Otto",
        age: 34,
        location: "London",
        address: "10 Downing Street"
    },
    {
        id: 1002,
        firstname: "Jacob",
        lastname: "Jacob",
        age: 34,
        location: "India",
        address: "#110 broad Street"
    }
];

export default function Modaltest() {
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const hanldeClick = (selectedRec) => {
        setSelectedData(selectedRec);
        setShow(true);
    };

    const hideModal = () => {
        setShow(false);
    };

    return (
        <div className="App">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Location</th>
                    <th scope="col">Show More</th>
                </tr>
                </thead>
                <tbody>
                {data.map((v) => (
                    <tr>
                        <td>{v.id}</td>
                        <td>{v.firstname}</td>
                        <td>{v.lastname}</td>
                        <td>@{v.location}</td>
                        <td>
                            <a href="#" onClick={() => hanldeClick(v)}>
                                More details
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {show && <Modal details={selectedData} handleClose={hideModal} />}
        </div>
    );
}

const Modal = ({ handleClose, details }) => {
    return (
        <div className="modal display-block">
            <section className="modal-main">
                <div className="App">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Age</th>
                            <th scope="col">Location</th>
                            <th scope="col">Address</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{details?.id}</td>
                            <td>{details?.firstname}</td>
                            <td>{details?.lastname}</td>
                            <td>{details?.age}</td>
                            <td>{details?.location}</td>
                            <td>{details?.address}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={handleClose}>close</button>
            </section>
        </div>
    );
};
