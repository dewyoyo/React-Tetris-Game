import React, { Component } from "react";
import ReactTetris from '../../components/ReactTetris';
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

        <ReactTetris />
      </div>
    );
  }
}

export default Home;