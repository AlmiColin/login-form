import React from "react";
import { MESSAGES, REGISTRATION_ERROR } from "./constants";
import { registration } from "./authentication";


export class PageRegistration extends React.Component {
  state = {};
  
  handleExit = (e) => {
    this.props.setPage(null);
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector('form');
    const login = form.elements.login.value;
    const password = form.elements.password.value;
   
    if (!(login && password)) {
      return this.setState({ message: REGISTRATION_ERROR });
    }

    registration(login, password)
      .then((resolve) => {
        return this.props.setPage(null); 
      })
      .catch((reject) => {
        const message = MESSAGES[reject.message];
        return this.setState({ message });
      });
  }
 
  render() {
    const {message} = this.state;
    return (
      <div className="page-login layout-center">
        <form
          className="login-form"
          onSubmit={this.handleSubmit}
        >
          <h1 className="form-title">Регистрация</h1>
          {message && (
            <div className="form-error">
              {message}
            </div>
          )}
          <div className="form-group">
            <input
              className="form-input"
              name="login"
              placeholder="Логин"
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              name="password"
              placeholder="Пароль"
              type="password"
            />
          </div>
          <button
            className="button"
            name="enter"
            onClick={this.handleSubmit}
          >
            Присоединиться
          </button>
          <div>
            <a
              className="links" 
              href="/#"
              onClick={this.handleExit}
            >
              Войти
            </a>
          </div>
        </form>
      </div>
    );
  };
};