import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
import logo from './../../logo/logo.png';

const Header = () => {

    const auth = useAuth()

    return (
        <section className="headerMain">
            <div className="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container-fluid">
                        <a className='logoLink' class="navbar-brand" href="/">
                            <img className='logoImg' src={logo} alt="" />
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>
                            <form class="d-flex">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " aria-current="page" href="./donation">Donation</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " aria-current="page" href="./events">Events</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " aria-current="page" href="./blog">Blog</a>
                                </li>
                                {
                                    auth.user ?
                                        <div className="headerBigBtn">
                                            <Link to="/registerVolunteer" className="btn btn-primary headerBtnRegister">Register</Link>
                                            <Link className="headerAcName" to="myprofile">{auth.user.displayName}</Link>
                                        </div>
                                        :
                                        <div className="headerBigBtn">
                                            <a href="/signin" className="btn btn-primary headerBtnRegister">Register</a>
                                            <a href="/admin" className="btn btn-primary headerBtnAdmin">Admin</a>
                                        </div>
                                }
                            </form>
                        </div>
                    </div>
                </nav>
            </div >
        </section >
    );
};

export default Header;