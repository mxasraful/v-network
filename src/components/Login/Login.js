import { Button } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import logo from './../../logo/logo.png'
import { useAuth } from './useAuth';

const Login = () => {

    const auth = useAuth()

    const { user, gSignIn, gSignInWRo, error, errorText } = auth

    const { rof } = useParams()

    const signInWithGoogle = () => {
        if (rof) {
            fetch(`https://morning-cove-36965.herokuapp.com/opportunity/${rof}`)
                .then(res => res.json())
                .then(data => {
                    gSignInWRo(data.url)
                })
                .catch(err => {
                    gSignIn()
                })
        } else {
            gSignIn()
        }
    }

    return (
        <section className="loginMain">
            {
                user ?
                    <>
                        {
                            window.location.pathname = "/registerVolunteer"
                        }
                    </>
                    :
                    <>
                        <div className="loginLogo">
                            <a href="/">
                                <img src={logo} alt="" className="loginLogoImg" />
                            </a>
                        </div>
                        <div className="loginContainer">
                            <h3 className="loginTitle text-center">Login With</h3>
                            <Button onClick={signInWithGoogle} className="googleLoginBtn text-center">
                                <img src="https://img.icons8.com/fluent/2x/google-logo.png" alt="" />
                                <span>Continue with Google</span>
                            </Button>
                        </div>
                    </>
            }
        </section>
    );
};

export default Login;