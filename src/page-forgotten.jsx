import React from "react";
import { passwordRecovery } from "./authentication";
import { MESSAGES } from "./constants";

export class PageForgotten extends React.Component {
  state = {};

  handleExit = (e) => {
    this.props.setPage2(null);
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector('form');
    const login = form.elements.login.value;
  
    passwordRecovery(login)
      .then((resolve) => {
        const password = resolve.password;
        return this.setState({ password, message: null });
      })
      .catch((reject) => { 
        const message = MESSAGES[reject.message];
        return this.setState({  message, password: null });
      })
  };

  render() {
    const { password, message } = this.state;
    return (
      <div className="page-login layout-center">
        <form
          className="login-form"        
        >
          {password && (
            <React.Fragment>
              <div className = 'happy-end-window'>
                <h3>Сообщение отправлено</h3>
                <div className="happy-end-message">
               <p>Инструкции на почте</p>
              </div>
              <a
                className="links" 
                href="/#"
                onClick={this.handleExit}
              >
                Войти
              </a>
              </div>
            </React.Fragment>
          )}  
          {message && (
            <div className="form-error">
              {message}
            </div>)}                
          {!password && 
            <React.Fragment>
              <h3 className="form-title">
                Забыли пароль?
                Введите свой логин и мы 
                отправим вам ссылку на сброс пароля
              </h3>
              <input
                className="form-input"
                name="login"
                placeholder="Логин"
              />
              <button
                className="button"
                name="enter" 
                onClick={this.handleSubmit}
              >
                Сбросить пароль
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
            </React.Fragment>
          }  
        </form>
      </div>
    ); 
  };
};