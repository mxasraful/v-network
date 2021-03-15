import React, { useEffect, useState } from 'react';
import logo from './../../logo/logo.png';
import './admin.css';

const Admin = () => {

    const [inputTitle, setInputTitle] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [inputDate, setInputDate] = useState('')

    const [activePage, setActivePage] = useState("vrlist")

    const [allOpportunities, setAllOpportunities] = useState(null)

    const [allRegistration, setAllRegistration] = useState([])

    useEffect(() => {
        fetch('https://morning-cove-36965.herokuapp.com/opportunities')
            .then(res => res.json())
            .then(data => {
                setAllOpportunities(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://morning-cove-36965.herokuapp.com/allRegistration')
            .then(res => res.json())
            .then(data => {
                setAllRegistration(data)
            })
    }, [])

    const forVrList = () => {
        document.querySelector(".adminMenuItemAddEvent").classList.remove("adminMenuItemActive")
        document.querySelector(".adminMenuItemVrList").classList.add("adminMenuItemActive")
        setActivePage("vrlist")
    }

    const forAddEvent = () => {
        document.querySelector(".adminMenuItemVrList").classList.remove("adminMenuItemActive")
        document.querySelector(".adminMenuItemAddEvent").classList.add("adminMenuItemActive")
        setActivePage(null)
    }

    const deleteRegistrationData = (event, id) => {
        fetch(`https://morning-cove-36965.herokuapp.com/registrationDelete?id=${id}`, {
            method: "DELETE"
        })
            .then(res => {
                event.target.parentElement.parentElement.style.display = 'none'
            })
    }

    return (
        <div className='adminPageMain'>
            <div className="adminLeft">
                <br />
                <div className="adminLogo">
                    <a href="/">
                        <img src={logo} alt="" />
                    </a>
                </div>
                <ul className="adminMenu">
                    <li onClick={forVrList} className='adminMenuItem adminMenuItemVrList adminMenuItemActive'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                        <span>Volunteer register list</span>
                    </li>
                    <li onClick={forAddEvent} className='adminMenuItem adminMenuItemAddEvent'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <span>Add Event</span>
                    </li>
                </ul>
            </div>
            <div className="adminRight">
                {
                    activePage ?
                        <div className="vrlistSection">
                            <div className="vrlistTitle">
                                <h3>Volunteer register list</h3>
                            </div>
                            <div className="vrMainList">
                                <div className="vrMainListTitle">
                                    <div className="vrlistName">Name</div>
                                    <div className="vrlistEmail">Email ID</div>
                                    <div className="vrlistRDate">Registering date</div>
                                    <div className="vrlistVList">Volunteer list</div>
                                    <div className="vrlistAction">Action</div>
                                </div>
                                <div className="vrMainListContent">
                                    {
                                        allRegistration.map(dt =>
                                            <div className="vrMainListSection">
                                                <div className="vrlistName">{dt.name}</div>
                                                <div className="vrlistEmail">{dt.email}</div>
                                                <div className="vrlistRDate">{dt.date}</div>
                                                <div className="vrlistVList">{dt.title}</div>
                                                <div className="vrlistAction">
                                                    <button onClick={(event) => deleteRegistrationData(event, dt._id)} className="btn btn-outline-danger">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className="addEvent">
                            <div className="addEventTitle vrlistTitle">
                                <h3>Add Event</h3>
                            </div>
                            <form className="addEventForm" action="">
                                <div className="addEventSection">
                                    <div className="addEventFormLeft">
                                        <label htmlFor="addEventInputName">Event Title</label><br />
                                        <input onChange={(e) => setInputTitle(e.target.value)} placeholder="Enter title" type="text" id="addEventInputName" className="addEventInput" required /><br /><br />
                                        <label htmlFor="addEventInputDescription">Description</label><br />
                                        <textarea onChange={(e) => setInputDescription(e.target.value)} rows="5" placeholder="Enter Description" type="text" id="addEventInputDescription" className="addEventInput" required></textarea><br /><br />
                                    </div>
                                    <div className="addEventFormRight">
                                        <label htmlFor="addEventInputDate">Event Date</label><br />
                                        <input onChange={(e) => setInputDate(e.target.value)} type="date" id="addEventInputDate" className="addEventInput" required /><br /><br />
                                        <label htmlFor="addEventInputUpBtn">Banner</label><br />
                                        <button type="button" id="addEventInputUpBtn" className="addEventBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                                                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                            </svg>
                                            <span>Upload image</span>
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary addEventSubmitBtn">Submit</button>
                            </form>
                        </div>
                }
            </div>
        </div >
    );
};

export default Admin;