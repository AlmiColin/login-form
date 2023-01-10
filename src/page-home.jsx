import React from "react";

export class PageHome extends React.Component {
  state = {};

  handleExit = (e) => {
    this.props.setUser(null)
  };

  render() {
    return (
      <div className="page-login layout-center">
        <div className="login-form">
          <div className="form-group">
            Привет, {this.props.user.login}
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
  };
};