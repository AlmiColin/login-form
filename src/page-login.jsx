import React from "react";
import { authentication } from "./authentication";
import { LOGIN_ERROR, MESSAGES_BY_CODE, UNKNOWN_ERROR } from "./constants";
import { withNavigate } from "./withNavigate";
import { Link } from "react-router-dom"

const formatCountdown = (timeMs) => {
  const date = new Date(timeMs);
  return date.toUTCString().split(' ')[4];
}

class PageLoginComponent extends React.Component {
  state = {};

  componentDidUpdate(prevProps, prevState) {
    const { time } = this.state;
    if (prevState.time !== time && time) {
      const interval = 1000;
      setTimeout(() => {
        const time = this.state.time - interval;
        const isDisabledButton = !!time; 
        this.setState({ time, isDisabledButton });
      }, interval);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { navigate } = this.props;
    const form = e.target;
    const login = form.elements.login.value;
    const password = form.elements.password.value;

    if (!(login && password)) {
      return this.setState({ message: LOGIN_ERROR });
    }

    this.setState({ isLoading: true, isDisabledButton: true });

    return authentication(login, password)
      .then(() => navigate("/home-page"))
      .catch((response) => {
        const isDisabledButton = response?.status === 410;
        const message = MESSAGES_BY_CODE[response?.status] || UNKNOWN_ERROR;
        return {
          isDisabledButton,
          message,
          time: (isDisabledButton && +response?.body?.timeout) || 0,
        };
      })
      .then((state) => this.setState({
        ...state,
        isLoading: false,
        isDisabledButton: state?.isDisabledButton || false,
      }));
  };
  
  handleMouseDown = () => {
    this.setState({ message: null });
  }

  render() {
    const {
      message,
      isDisabledButton,
      isLoading,
      time,
    } = this.state;

    return (
      <React.Fragment>
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
                onMouseDown = {this.handleMouseDown}
              />
            </div>
            <div className="form-group">
              <input
                className="form-input"
                name="password"
                placeholder="Пароль"
                type="password"
                onMouseDown = {this.handleMouseDown}
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
              <Link className="links" to={`/registration`}>Создать аккаунт</Link>
            </div>
          </form>
        </div>   
      </React.Fragment>  
    );
  };
};

export const PageLogin = withNavigate(PageLoginComponent);