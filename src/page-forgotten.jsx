import React from "react";
import { passwordRecovery } from "./authentication";
import { MESSAGES } from "./constants";

export class PageForgotten extends React.Component {
  state = {};

  handleExit = (e) => {
    this.props.setUser(null)
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const login = form.elements.login.value;
  
    passwordRecovery(login)
      .then((resolve) => {
        const password = resolve.user.password;
        return this.setState({ password })
      })
      .catch((reject) => { 
        const message = MESSAGES[reject.message];
          return this.setState({ message });
      })
  };

  render() {
    const { password, message } = this.state;
    return (
      <div className="page-login layout-center">
        <form
          className="login-form"
          onSubmit={this.handleSubmit}
        >
          {!password && (<h3 className="form-title">
            Забыли пароль?
            Введите свой логин и мы 
            отправим вам ссылку на сброс пароля
          </h3>)}
          {!password && (<div className="form-group">
            <input
              className="form-input"
              name="login"
              placeholder="Логин"
            />
          </div>)}
          {password && (<div className="form-group">
            Информация о восстановлении пароля отправлена на почту
          </div>)}
          {message && (
            <div className="form-error">
              {message}
            </div>
          )}
          {!password && (<button
            className="button"
            name="enter"
          >
            Сбросить пароль
          </button>)}
          {password && (<button
            className="button"
            name="exit"
            onClick={this.handleExit}
          >
            Выход
          </button>)}
        </form>
      </div>
    );
  };
};