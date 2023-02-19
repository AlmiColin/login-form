import React from "react";
import { logout, session } from "./authentication";
import { withNavigate } from "./withNavigate";

class PageHomeComponent extends React.Component {
  state = {};
  
  goMainPage = () => this.props.navigate('/');
  handleExit = () => logout().then(this.goMainPage);

  componentDidMount() {
    if (!this.state.user) {
      session()
        .then(user => this.setState({ user }))
        .catch(this.goMainPage);
    }
  };

  render() {
    if (!this.state.user) {
     return null;
    }
    const { user: { login, avatarFile = "default.jpg"} } = this.state;
    return (
      <div className="page-login layout-center">
        <div className="login-form">
          <div className = "form-group home">      
            <div>
              <p className = "greeting">Привет, {login}</p>
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