import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TopNav.css";
import API from "../../utils/API";

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loggedIn: false,
            userID: ""
        };
    }

    componentDidMount() {
        API.isLoggedIn().then(user => {
            // console.log(user);
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    userID: user.data.user.username
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    logout() {
        API.logout().then((data) => {
            window.location.pathname = "/"
        }).catch((err) => {
            console.log(err)
        })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="loginNavbar">

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a href="/" className="titleFont"> React Tetris Game</a>
                    <div className="data-login-box">
                        {this.state.loggedIn ? (
                            <>
                                <p className="navbar-brand">Logged in as {this.state.userID}</p>
                                <p className="navbar-brand"onClick={this.logout}>Logout</p>
                            </>
                        ) : (
                                <>
                                    <Link className="navbar-brand" to="/login">login</Link>
                                    <Link className="navbar-brand" to="/signup">signup</Link>
                                </>
                            )}

                    </div>

                </nav>
            </div>
        );
    }
}