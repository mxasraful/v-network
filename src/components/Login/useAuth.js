import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './../../firebase.config';
import { Redirect, Route } from 'react-router';

firebase.initializeApp(firebaseConfig);

// Context create, use and export 
const AuthContext = createContext()
export const AuthContextProvider = (props) => {
    const auth = Auth()
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

// Privet route create and export
export const PrivateRouteForLogin = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export const PrivateRouteForVLogin = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: `/signin/r/`,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

// Authentication 
const Auth = () => {

    const [user, setUser] = useState(null)

    const [error, setError] = useState(false)

    const [errorText, setErrorText] = useState(null)

    // Start google sign 
    const gSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                setUser(res.user)
                window.history.back()
                setError(false)
                setErrorText(null)
            })
            .catch(err => {
                setError(true)
                setErrorText(err.message)
            })
    }

    const gSignInWRo = (ro) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                setUser(res.user)
                window.location.pathname = `/registerVolunteer/${ro}/h/`
                setError(false)
                setErrorText(null)
            })
            .catch(err => {
                setError(true)
                setErrorText(err.message)
            })
    }

    // Start logout
    const logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                setUser(null)
                setError(false)
                setErrorText(null)
            })
            .catch(err => {
                setError(true)
                setErrorText(err.message)
            })
    }

    // Set And Get LoggedIn User
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                setUser(usr)
            } else {

            }
        });
    }, [])

    // useEffect(() => {
    //     firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    //         .then(function (idToken) {
    //             console.log(idToken)
    //         }).catch(function (error) {
    //             // Handle error
    //         });
    // }, [])
    // Firebase install করা থাকার পরেও (TypeError: Cannot read property 'getIdToken' of null) এই ইরোরটা দেওয়ার কারনে টোকেন সিস্টেমটা অফ আছে।

    return {
        user,
        error,
        errorText,
        gSignIn,
        gSignInWRo,
        logOut
    }
}