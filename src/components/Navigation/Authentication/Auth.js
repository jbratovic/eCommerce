import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';

import './Aut.css';
import useInput from '../../hooks/use-input';
import style from '../UI/GlobalCSS.module.css';

import AuthContext from '../store/auth-context';


const Auth = () => {

    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const authCtx = useContext(AuthContext);

    const history = useHistory();

    const {
        value: email,
        isInputValid: emailValid,
        isBlur: isBlurEmail,
        inputHandler: inputHandlerEmail,
        onBlurHandler: onBlurHandlerEmail

    } = useInput('email');

    const {
        value: password,
        isInputValid: passwordValid,
        isBlur: isBlurPassword,
        inputHandler: inputHandlerassword,
        onBlurHandler: onBlurHandlerassword

    } = useInput('default');

    let isValid = false;
    if (emailValid) {
        isValid = true;
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!isValid) {
            return;
        }

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAYXfi1p0TZYHuKtXTG5uCcz0cHfFbyxg';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAYXfi1p0TZYHuKtXTG5uCcz0cHfFbyxg';
        }

        setLoading(true);

        try {
            const response = await fetch(url, {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: false
                })
            });
            const responseData = await response.json();
            if (responseData) {

                if (responseData.error) {
                    setAuthError(responseData.error.message);
                    setLoading(false);
                    return;
                }

                // "expiresIns" property only exist if ucer create new account, if he just log in "expiresIns" property doesn't exist 
                // and we check if property exist extend time for one hour, if don't we manually extend it by one hour
                // after user login every 1 hour time was extended eg: if user login in 18:10 session ends in 19:10
                // if he logout and login again in 18:30 session ends in 19:30, not 19:10, which means time extends every hour he login
                // this is not good example if we have more users which means that if anyone login time extends for everyone, not just for him
                // in that case we must have custom database and keep records of individual user. This is just general example

                let convertTimeToMiliseconds;
                if (responseData.expiresIns) {
                    convertTimeToMiliseconds = new Date(new Date().getTime() + (+responseData.expiresIn * 1000)); // set time after user create profile
                } else {
                    convertTimeToMiliseconds = new Date(new Date().getTime() + (3600 * 1000)); // get current time after user login
                }

                setLoading(false);
                authCtx.login(responseData.idToken, convertTimeToMiliseconds);
                history.replace('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const switchAuthHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const errorMessageEmail = !emailValid && isBlurEmail ? <p className={style.errorMessage}>Enter valid mail.</p> : '';
    const errorMessagePassword = !passwordValid && isBlurPassword ? <p className={style.errorMessage}>Enter valid password.</p> : '';

    return (
        <section className="section-main">
            <div className="container">
                <div className="row">

                    <div className="col-md-6 offset-3 auth-form">
                        <h1 className="m-b-2">{isLogin ? 'Login' : 'Sign Up'}</h1>
                        <form onSubmit={submitHandler}>

                            <div className={`form-input-set text-left m-b-2 ${errorMessageEmail && "decoration-negative"}`}>
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-input" onChange={inputHandlerEmail} onBlur={onBlurHandlerEmail} name="email" id="email" placeholder="Product name" />
                                {errorMessageEmail}
                            </div>

                            <div className={`form-input-set text-left m-b-2 ${errorMessagePassword && "decoration-negative"}`}>
                                <label htmlFor="name">Password</label>
                                <input type="password" className="form-input" onChange={inputHandlerassword} onBlur={onBlurHandlerassword} name="name" id="name" placeholder="Product name" />
                                {errorMessagePassword}
                            </div>

                            {authError && <p>{authError}</p>}

                            {!loading ? <div className="col-md-12 text-center m-t-3">
                                <button className="btn btn-brand">{isLogin ? 'Login' : 'Create Account'}</button>
                            </div> : <Spinner />
                            }

                            <button className="m-t-2" onClick={switchAuthHandler}> {isLogin ? 'Create new account' : 'Login with existing account'}</button>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Auth;