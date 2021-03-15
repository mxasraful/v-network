import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const MyProfile = () => {

    const auth = useAuth()

    const [regAll, setRegAll] = useState(null)

    useEffect(() => {
        if (auth.user) {
            fetch(`https://morning-cove-36965.herokuapp.com/registrations?email=${auth.user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRegAll(data)
                })
        }
    }, [auth.user])

    const deleteRegistrationData = (event, id) => {
        fetch(`https://morning-cove-36965.herokuapp.com/registrationDelete?id=${id}`, {
            method: "DELETE"
        })
            .then(res => {
                event.target.parentElement.parentElement.remove()
            })
    }

    return (
        <div className='myProfileMain'>
            <div className="container">
                {
                    auth.user ?
                        <div className="row">
                            {
                                regAll ?
                                    <>
                                        {
                                            regAll.length > 1 ?
                                                <>
                                                    {
                                                        regAll.map(dta =>
                                                            <div className="col-sm-6">
                                                                <div className="card card-danger myOp">
                                                                    <div style={{ display: "flex" }} className="card-body">
                                                                        <div className="cardImg">
                                                                            <img src={dta.img} alt="" />
                                                                        </div>
                                                                        <div className="cardContent">
                                                                            <h2>{dta.title}</h2>
                                                                            <h4>{dta.date}</h4>
                                                                        </div>
                                                                    </div>
                                                                    <button onClick={(event) => deleteRegistrationData(event, dta._id)} className="btn btn-danger text-right cardCancelBtn">Cancel</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </>
                                                :
                                                <>
                                                    {
                                                        regAll.length === 0 ?
                                                            <div className="alert text-center">
                                                                <div className="alert-body">
                                                                    <span>You don't register in liberty.</span><br />
                                                                    <Link className="btn btn-outline-primary" to="./../../registerVolunteer/">Register</Link>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="col-sm-6 ggg">
                                                                <div className="card card-danger myOp">
                                                                    <div style={{ display: "flex" }} className="card-body">
                                                                        <div className="cardImg">
                                                                            <img src={regAll[0].img} alt="" />
                                                                        </div>
                                                                        <div className="cardContent">
                                                                            <h2>{regAll[0].title}</h2>
                                                                            <h4>{regAll[0].date}</h4>
                                                                        </div>
                                                                    </div>
                                                                    <button onClick={(event) => deleteRegistrationData(event, regAll[0]._id)} className="btn btn-danger text-right cardCancelBtn">Cancel</button>
                                                                </div>
                                                            </div>
                                                    }
                                                </>
                                        }
                                    </>
                                    :
                                    <div className="alert text-center">
                                        <div className="alert-body">
                                            <span>You don't register in liberty.</span><br />
                                            <Link className="btn btn-outline-primary" to="./../../registerVolunteer/">Register</Link>
                                        </div>
                                    </div>
                            }
                        </div>
                        : ""
                }
            </div>
        </div>
    );
};

export default MyProfile;