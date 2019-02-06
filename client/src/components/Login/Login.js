import React from "react";
import { Link } from "react-router-dom";
import './Login.css';

function Login(props) {
    return (

        <div className="loginBox">
            <h2 className="loginTitle title-font">Login</h2>
            <hr />
            {props.message ? (
                <h4 className="password-warning">{props.message}</h4>
            ) : (<></>)}


            <form>
                <p>Username:</p>          
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={props.username}
                    onChange={props.handleInputChange}
                />
                <p>Password:</p>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={props.password}
                    onChange={props.handleInputChange}
                />
                <button onClick={props.handleLogin}>Login</button>
                <p className="signupLink">
                    <Link to="/signup">dont have an account?  Sign up here</Link>
                </p>
            </form>

        </div>
    );
}

export default Login;