import React from "react";
import { authentication } from "./authentication";
import { LOGIN_ERROR, MESSAGES_BY_CODE, UNKNOWN_ERROR } from "./constants";

const formatCountdown = (timeMs) => {
  const date = new Date(timeMs);
  return date.toUTCString().split(' ')[4];
};

export class PageLogin extends React.Component {
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
    const { setUser } = this.props;
    const form = e.target;
    const login = form.elements.login.value;
    const password = form.elements.password.value;

    if (!(login && password)) {
      return this.setState({ message: LOGIN_ERROR });
    };

    this.setState({ isLoading: true, isDisabledButton: true });

    authentication(login, password)
      .then((user) => setUser(user))
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

  handleOpenPage = (e) => {
    e.preventDefault();
    const page = e.target?.dataset?.page;
    this.props.setPage(page);
    const page2 = e.target?.dataset?.page2;
    this.props.setPage2(page2);
  };

  render() {
    const {
      message,
      isDisabledButton,
      isLoading,
      time,
    } = this.state;

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
            <a
              className="links" 
              href="/#"
              onClick={this.handleOpenPage}
              data-page2="recover-password"
            >
              Забыли пароль?
            </a>
          </div>
          <div>
            <a 
              className="links"
              href="/#" 
              onClick={this.handleOpenPage}
              data-page="registration"
            >
              Создать аккаунт
            </a>
          </div>
        </form>
      </div>
    );
  };
};