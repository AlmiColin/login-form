import React from "react";
import { PageLogin } from "./page-login"
import { PageHome } from "./page-home"
import "./index.css";

export class App extends React.Component {
  state = {};
 
  setUser = (user) => {
    this.setState({ user })
  };

  render(){
    const { user } = this.state;
    if (user) {
      return (
        <PageHome user={user} setUser={this.setUser} />
      )
    }
    return (
      <PageLogin user={user} setUser={this.setUser} />
    )
  };
};