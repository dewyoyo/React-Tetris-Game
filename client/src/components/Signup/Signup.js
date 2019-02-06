import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Signup.css';

class Signup extends Component {
    state = {
        validUsername: false,
        validPassword: false,
        confirmPassword: false
    }

    componentDidUpdate() {
        this.validatePassword();
        this.confirmPassword();
        this.validateUsername();
    }

    validateUsername() {
        if (this.props.username.length > 1 && !this.state.validUsername) {
            this.setState({
                validUsername: true
            });
        }
        if (this.props.username.length < 1 && this.state.validUsername) {
            this.setState({
                validUsername: false
            });
        }
    }

    validatePassword() {
        let strongPassword = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
        let valid = strongPassword.test(this.props.password);
        if (!this.state.validPassword && valid) {
            this.setState({
                validPassword: true
            });
        }
        if (this.state.validPassword && !valid) {
            this.setState({
                validPassword: false,
            });
        }
    }

    confirmPassword() {
        if (this.props.password === this.props.confirmPassword && !this.state.confirmPassword && this.props.password) {
            this.setState({
                confirmPassword: true
            });
        }
        if (this.props.password !== this.props.confirmPassword && this.state.confirmPassword) {
            this.setState({
                confirmPassword: false
            });
        }
    }

    render() {
        return (
            <div className="loginBox">
                <h2 className="loginTitle title-font">Signup</h2>
                <hr />
                {this.props.message ? (
                    <h4 className="password-warning">{this.props.message}</h4>
                ) : (<></>)}


                <form>
                    <p>Username: {this.props.username}</p>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={this.props.username}
                        onChange={this.props.handleInputChange}
                        valid={this.state.validUsername}
                    />
                    <p>Password: {this.state.password}</p>
                    <h5 className="password-warning">Password should have at least 8 characters, 1 capital & 1 number</h5>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.props.password}
                        onChange={this.props.handleInputChange}
                        valid={this.state.validPassword}
                    />
                    <p>Confirm Password: {this.state.password}</p>
                    <input
                        type="password"
                        placeholder="confirm password"
                        name="confirmPassword"
                        value={this.props.confirmPassword}
                        onChange={this.props.handleInputChange}
                        valid={this.state.confirmPassword}
                    />
                    {/* if all fields are valid, allow the user to submit the form */}
                    {(this.state.validUsername && this.state.validPassword && this.state.confirmPassword) ? (
                        <button onClick={this.props.handleSignup} color="success" block>Signup</button>
                    ) : (
                            <button onClick={this.props.handleSignup} color="danger" block disabled>Signup</button>
                        )}
                    <p className="signupLink">
                        <Link to="/login">already have an account?  Sign in here</Link>
                    </p>


                </form>

            </div>
        );
    }
}

export default Signup;