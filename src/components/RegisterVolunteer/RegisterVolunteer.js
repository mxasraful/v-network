import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../Login/useAuth';
import spinner from "./../../spinner/spinner1.svg"
import logo from './../../logo/logo.png';
import { useForm } from 'react-hook-form';

const RegisterVolunteer = () => {

    const [opportunitiesDt, setOpportunitiesDt] = useState([])

    const [defValue, setDefValue] = useState(null)

    const [alreadyRegistered, setAlreadyRegistered] = useState(false)

    const [pageOk, setPageOk] = useState(false)

    const auth = useAuth()

    const { op } = useParams()

    const h = (window.location.pathname.endsWith("h/"))

    // Get opportunities Data
    useEffect(() => {
        fetch('https://morning-cove-36965.herokuapp.com/opportunities')
            .then(res => res.json())
            .then(data => {
                setOpportunitiesDt(data)
                const dt = data.find(dt => dt.url === op)
                setDefValue(dt)
            })
    }, [])

    // React Hook Form
    const { register, errors, handleSubmit } = useForm();
    const onSubmit = data => {
        if (defValue) {
            data.title = defValue.title
            data.img = defValue.img
        } else {
            fetch(`https://morning-cove-36965.herokuapp.com/opportunity/${data.library}`)
                .then(res => res.json())
                .then(dt => {
                    data.title = dt.title
                    data.img = dt.img
                    fetch(`https://morning-cove-36965.herokuapp.com/registration?email=${data.email}&&library=${data.library}`)
                        .then(res => res.json())
                        .then(dt => {
                            // if (dt.length > 1) {
                            setAlreadyRegistered(true)
                            // }
                        })
                        .catch(err => {
                            setAlreadyRegistered(false)
                            fetch("https://morning-cove-36965.herokuapp.com/addRegForm", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(data)
                            })
                                .then(result => {
                                    window.history.back()
                                })
                        })
                })
        }
    };

    // User Management
    useEffect(() => {
        if (h) {
            if (auth.user) {
                setPageOk(true)
            } else {
                setPageOk(false)
            }
        } else {
            if (op) {
                if (auth.user) {
                    setPageOk(true)
                } else {
                    setPageOk(false)
                    window.location.pathname = `/signin/r/${op}`
                }
            } else {
                if (auth.user) {
                    setPageOk(true)
                } else {
                    setPageOk(false)
                    window.location.pathname = "signin"
                }
            }
        }
    }, [])


    return (
        <section className=''>
            {
                auth.user ?
                    <>
                        <div className="loginLogo">
                            <a href="/">
                                <img src={logo} alt="" className="loginLogoImg" />
                            </a>
                        </div>
                        {
                            alreadyRegistered ?
                                <div className="container"><br />
                                    <div className="alreadyRegisteredAlert alert alert-danger">
                                        <div className="alert-body">
                                            <span>You Are Already Registered In This library. Please Change Organize books at the library section.</span>
                                            <button style={{ float: 'right' }} onClick={() => setAlreadyRegistered(false)} className="btn btn-danger">Ok</button>
                                        </div>
                                    </div>
                                </div> :
                                ""
                        }
                        <form onSubmit={handleSubmit(onSubmit)} className="RegisterVolunteerForm">
                            <h3 className='text-dark'>Register as a Volunteer</h3>
                            <br />
                            <label className='text-dark' htmlFor="rFormName">Name <span className="text-danger">*</span></label><br />
                            <input className="rFormInput" id="rFormName" name="name" ref={register({ required: true })} value={auth.user.displayName} /><br />
                            {errors.name && "Name is required."}<br />
                            <label className='text-dark' htmlFor="rFormEmail">Email <span className="text-danger">*</span></label><br />
                            <input className="rFormInput" id="rFormEmail" name="email" ref={register({ required: true })} value={auth.user.email} /><br />
                            {errors.email && "Email is required."}<br />
                            <label className='text-dark' htmlFor="rFormDate">Date <span className="text-danger">*</span></label><br />
                            <input type='date' className="rFormInput" id="rFormDate" name="date" ref={register({ required: true })} /><br />
                            {errors.date && "Date is required."}<br />
                            <label className='text-dark' htmlFor="rFormDesicription">Desicription <span className="text-danger">*</span></label><br />
                            <textarea className="rFormInput" id="rFormDesicription" rows="3" name="Desicription" ref={register({ required: true })} /><br />
                            {errors.Desicription && "Desicription is required."}<br />
                            <label className='text-dark' htmlFor="rFormLibrary">Organize books at the library <span className="text-danger">*</span></label><br />
                            {defValue ?
                                <select className="rFormInput" id="rFormLibrary" name="library" value={defValue.url} ref={register({ required: true })} >
                                    {
                                        opportunitiesDt.map(dt =>
                                            <option value={dt.url}>{dt.title}</option>
                                        )
                                    }
                                </select>
                                :
                                <select className="rFormInput" id="rFormLibrary" name="library" ref={register({ required: true })} >
                                    {
                                        opportunitiesDt.map(dt =>
                                            <option value={dt.url}>{dt.title}</option>
                                        )
                                    }
                                </select>
                            }
                            <br />
                            {errors.library && "Library is required."}<br /><br />
                            {/* <InputLabel htmlFor="regFName">Full Name *</InputLabel>
                            <Input onChange={() => setInputName(auth.user.displayName)} value={auth.user.displayName} id="regFName" name="regFName" aria-describedby="my-helper-text" ref={register} />
                            <InputLabel htmlFor="regEmail">Email Address *</InputLabel>
                            <Input onChange={() => setInputEmail(auth.user.email)} value={auth.user.email} id="regEmail" name="regEmail" aria-describedby="my-helper-text" ref={register} />
                            <InputLabel htmlFor="regDate">Date *</InputLabel>
                            <Input onChange={(e) => setInputDate(e.target.value)} type='date' id="regDate" name="regDate" aria-describedby="my-helper-text"  ref={register}/>
                            <TextField
                                id="standard-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                required
                                name="regDescription"
                                onChange={(e) => setInputDescription(e.target.value)}
                            />
                            <InputLabel id="demo-simple-select-label">Organize books at the library *</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                required
                                name="regOrganize"
                                value={defValue ? defValue.url : selectValue}
                                onChange={handleSelectChange}
                            >
                                {
                                    opportunitiesDt.map(dt =>
                                        <MenuItem value={dt.url}>{dt.title}</MenuItem>
                                    )
                                }
                            </Select> */}
                            <Button type="Submit" className="registerVolunteerSubmitBtn" >Registration</Button>
                        </form>
                    </>
                    :
                    <div className="container">
                        <div className="registerPageLoader">
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <img src={spinner} alt="" className="registerPageLoaderImg" />
                        </div>
                    </div>
            }
        </section>
    );
};

export default RegisterVolunteer;