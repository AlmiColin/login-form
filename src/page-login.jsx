import  React, { useState, useEffect } from "react";
import { authentication } from "./authentication";
import { LOGIN_ERROR, MESSAGES_BY_CODE, UNKNOWN_ERROR } from "./constants";
import { Link, useNavigate } from "react-router-dom";

export function PageLogin() {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [isDisabledButton, setIsDisabledButton] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const formatCountdown = (timeMs) => {
    const date = new Date(timeMs);
    return date.toUTCString().split(' ')[4];
  };

  useEffect(() => { 
    if (time) {
      const interval = 1000;
      setTimeout(() => {
        const countTime = time - interval;
        const isDisabledButton = !!countTime; 
        setTime(countTime);
        setIsDisabledButton(isDisabledButton);
      }, interval);
    }
  }, [time, isDisabledButton]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const login = form.elements.login.value;
    const password = form.elements.password.value;

    if (!(login && password)) {
      return setMessage(LOGIN_ERROR);
    }

  return authentication(login, password)
    .then(() => navigate("/home-page"))
    .catch((response) => {
      const isDisabledButton = response?.status === 410;
      const message = MESSAGES_BY_CODE[response?.status] || UNKNOWN_ERROR;
      setIsDisabledButton(isDisabledButton);
      setMessage(message);
      setTime((isDisabledButton && +response?.body?.timeout) || 0); 
    })
    .then(() => 
      setIsLoading(false),
      setIsDisabledButton(isDisabledButton || false)
    )
  };

  const handleMouseDown = () => {
    setMessage(null);
  };

  return (
    <React.Fragment>
      <div className="page-login layout-center">
        <form
          className="login-form"
          onSubmit={handleSubmit}
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
              onMouseDown={handleMouseDown}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              name="password"
              placeholder="Пароль"
              type="password"
              onMouseDown={handleMouseDown}
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
            <Link className="links" to={"/registration"}>Создать аккаунт</Link>
          </div>
        </form>
      </div>   
    </React.Fragment>  
  );
};