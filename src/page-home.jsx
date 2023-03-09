import React, { useState, useEffect, useCallback } from "react";
import { logout, session } from "./authentication";
import { useNavigate } from "react-router-dom";

export function PageHome() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const goMainPage = useCallback(() => navigate('/'), [navigate]);

  useEffect(() => {
    if (!user) {
      session()
        .then(setUser)
        .catch(goMainPage);
    }
  }, [user, goMainPage]);

  if (!user) {
    return null;
  };

  const {login, avatarFile = "default.jpg"} = user;

  return (
    <div className="page-login layout-center">
      <div className="login-form">
        <div className = "form-group home">      
          <div>
            <p className = "greeting">Привет, {login}</p>
          </div>
          <img className="avatar-image" src={`/avatars/${avatarFile}`} alt = "" />
          <button
            className="button exit"
            name="exit"
            onClick={() => logout().then(goMainPage)}
          >
            Выход
          </button>
        </div>
      </div>
    </div>
  );
};