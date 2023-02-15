import React from "react";
import { withNavigate } from "./withNavigate";

class PageHomeComponent extends React.Component {
  state = {};
  
  handleExit = () => this.props.navigate('/');

  render() {
    const { avatarFile = "default.jpg"} = this.state;
    return (
      <div className="page-login layout-center">
        <div className="login-form">
          <div className = "form-group home">      
            <div>
              <p className = "greeting">Привет, User</p>
            </div>
              <img class="avatar-image" src={`/avatars/${avatarFile}`} alt = "" />
            <button
              className="button exit"
              name="exit"
              onClick={this.handleExit}
            >
              Выход
            </button>
          </div>
        </div>
      </div>
    );
  };
};

export const PageHome = withNavigate(PageHomeComponent);