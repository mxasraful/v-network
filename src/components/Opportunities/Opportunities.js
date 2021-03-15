import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import spinner from './../../spinner/spinner.svg'

const Opportunities = () => { 

    const [options, setOptions] = useState([])

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetch('https://morning-cove-36965.herokuapp.com/opportunities')
            .then(res => res.json())
            .then(data => {
                setOptions(data)
                setLoader(false)
            })
    }, [])

    return (
        <section className="opportunitiesMain">
            <div className="container">
                <div class="row">
                    {
                        loader ?
                            <div className="opportunitiesLoader">
                                <div className="opportunitiesLoaderContainer">
                                    <img src={spinner} alt="" />
                                </div>
                            </div>
                            :
                            <>
                                {
                                    options.map(dt =>
                                        <Link to={"/registerVolunteer/"+dt.url} class="col-sm-3">
                                            <div class="card opportunityCard">
                                                <img src={dt.img} alt="" className="opportunityImg" />
                                                <div style={{ background: dt.bgColor }} className="opportunityTitle text-center">
                                                    <h3 style={dt.mTop ? { marginTop: dt.mTop } : { marginTop: "12px" }}>{dt.title}</h3>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </>
                    }
                </div>
            </div>
        </section>
    );
};

export default Opportunities;