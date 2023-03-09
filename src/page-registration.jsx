import React, { useState } from "react";
import { REGISTRATION_ERROR } from "./constants";
import { registration } from "./authentication";
import { Link, useNavigate } from "react-router-dom";

export function PageRegistration() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleMouseDown = () => {
    setMessage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const login = form.elements.login.value;
    const password = form.elements.password.value;
   
    if (!(login && password)) {
      return setMessage(REGISTRATION_ERROR);
    }

    registration(login, password)
      .then((res) => {
        navigate("/");
      })
      .catch((response) => {
        return setMessage(REGISTRATION_ERROR);
      }
    )
  };

  return (
    <div className="page-login layout-center">
      <form
        className="login-form"
        onSubmit={handleSubmit}
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
        >
          Присоединиться
        </button>
        <div>
          <Link className="links" to={`/`}>Войти</Link>
        </div>
      </form>
    </div>
  );
};