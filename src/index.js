import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const users = [
  { login: "Korgi", password:"Gav" },
  { login: "Kisa", password:"Mao" },
];

class Form extends React.Component {
  state = {};  

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const login = form.elements.login.value;
    const password = form.elements.password.value;
    const user = users.find(item => item.login === login&&item.password === password);
    this.setState({user});
  };

  handleClick = (e) => {
    this.setState({user: false})
  };

  render() {
    if (this.state.user) {
      return (
        <div className="container">
           <div className="form">
              Привет, {this.state.user?.login}
              <button className="button" name="exit" onClick={this.handleClick}>Выход</button>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h1 className="form-title">Войти:</h1>
          <div className="form-group">
            <input className="form-input" name="login" placeholder="Логин" />    
          </div>
          <div className="form-group">
            <input className="form-input" name="password" placeholder="Пароль" type="password" />
          </div>
          <button className="button" name="enter">Войти</button>
          <div>
            <a className="links" href="#">Забыли пароль?</a>
          </div>
          <div>
            <a className="links" href="#">Создать аккаунт</a>
          </div>
        </form>
      </div>
    );
  };
};

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(< Form />); 