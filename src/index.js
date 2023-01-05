import React from "react";
import ReactDOM from "react-dom/client";
import { authentication } from "./authentication";
import { LOGIN_ERROR, MESSAGES_BY_CODE, UNKNOWN_ERROR } from "./constants";
import "./index.css";

const formatCountdown = (timeMs) => {
  const date = new Date(timeMs);
  return date.toUTCString().split(' ')[4];
};

class Form extends React.Component {
  state = {};

  componentDidUpdate(prevProps, prevState) {
  if (this.state.time) {
    const interval = 1000;
    setTimeout(() => {
      const time = this.state.time - interval;
      const isDisabledButton = !!time; 
      this.setState({ time, isDisabledButton });
      }, interval);
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const login = form.elements.login.value;
    const password = form.elements.password.value;

    if (!(login && password)) {
      return this.setState({ message: LOGIN_ERROR });
    };

    this.setState({ isLoading: true, isDisabledButton: true });

    authentication(login, password)
      .then((user) => ({ user }))
      .catch((response) => {
        const isDisabledButton = response?.code === "410";
        const message = MESSAGES_BY_CODE[response?.code] || UNKNOWN_ERROR;
        return {
          isDisabledButton,
          message,
          time: isDisabledButton ? 10000 : 0,
        };
      })
      .then((state) => this.setState({
        ...state,
        isLoading: false,
        isDisabledButton: state?.isDisabledButton || false,
      }));
  };

  handleExit = (e) => {
    this.setState({ user: null })
  };

  render() {
    const {
      user,
      message,
      isDisabledButton,
      isLoading,
      time,
    } = this.state;

    if (user) {
      return (
        <div className="page-login layout-center">
          <div className="login-form">
            <div className="form-group">
              Привет, {user.login}
            </div>
            <button
              className="button"
              name="exit"
              onClick={this.handleExit}
            >
              Выход
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="page-login layout-center">
        <form
          className="login-form"
          onSubmit={this.handleSubmit}
        >
          <h1 className="form-title">Войти</h1>
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
            disabled={isDisabledButton || isLoading}
          >
            Войти
          </button>
          {isLoading && (
            <div className="request-message">Передача...</div>
          )}
          {!!time && (
            <div className="request-message">{formatCountdown(time)}</div>
          )}
          <div>
            <a className="links" href="/#">Забыли пароль?</a>
          </div>
          <div>
            <a className="links" href="/#">Создать аккаунт</a>
          </div>
        </form>
      </div>
    );
  };
};

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Form />);