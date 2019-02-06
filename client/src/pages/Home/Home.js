import React, { Component } from "react";
import Field from '../../components/Field'
import API from "../../utils/API";

import "./Home.css";

class Home extends Component {

  state = {
    loggedIn: false,
  };

  componentDidMount() {
    this.loggedIn();
  }



  loggedIn = () => {
    API.isLoggedIn().then(user => {
      if (user.data.loggedIn) {
        this.setState({
          loggedIn: true
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="homeBox">

        <Field />
      </div>
    );
  }
}

export default Home;