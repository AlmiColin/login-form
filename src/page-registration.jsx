import React from "react";
import { REGISTRATION_ERROR } from "./constants";
import { registration } from "./authentication";
import { Link } from "react-router-dom";
import { withNavigate } from "./withNavigate";


class PageRegistrationComponent extends React.Component {
  state = {};
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { navigate } = this.props;
    const form = document.querySelector('form');
    const login = form.elements.login.value;
    const password = form.elements.password.value;
   
    if (!(login && password)) {
      return this.setState({ message: REGISTRATION_ERROR });
    };

    registration(login, password)
      .then((res) => {
        navigate("/");
      })
      .catch((response) => {
        return this.setState({ message: REGISTRATION_ERROR });
      });
  };
 
  render() {
    const { message } = this.state;
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
            <Link className="links" to= {`/`}>Войти</Link>
          </div>
        </form>
      </div>
    );
  };
};

export const PageRegistration = withNavigate(PageRegistrationComponent);