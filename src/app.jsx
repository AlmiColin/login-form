import React from "react";
import { PageLogin } from "./page-login"
import { PageHome } from "./page-home"
import "./index.css";
import { PageRegistration } from "./page-registration";
import { PageForgotten } from "./page-forgotten";

export class App extends React.Component {
  state = {};
 
  setUser = (user) => {
    this.setState({ user })
  };

  setPage = (page) => {
    this.setState({ page })
  };

  setPage2 = (page2) => {
    this.setState({ page2 })
  };

  render(){
    const { user, page, page2 } = this.state;
    if (user) {
      return (
        <PageHome user={user} setUser={this.setUser} />
      )
    }
    if (page) {
      return (
        <PageRegistration user={user} setPage={this.setPage} setUser={this.setUser}/>
      ) 
    }
    if (page2) {
      return (
        <PageForgotten user={user} setPage2={this.setPage2} setUser={this.setUser}/>
      ) 
    }
    return (
      <PageLogin user={user} setUser={this.setUser} setPage={this.setPage} setPage2={this.setPage2} />
    )
  };
};