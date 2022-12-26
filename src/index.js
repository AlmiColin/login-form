import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Form extends React.Component {


  render() {
    return(
      <div class = 'container'>
        <form class = 'form'>
          <h1 class ='form-title'>Войти:</h1>
            <div class='form-group'>
                  <input class='form-input' placeholder='Адрес электронной почты'/>
                  
            </div>
            <div class ='form-group'>
                  <input class='form-input' placeholder='Пароль' type='password'/>
            </div>
                  <button class ='button'>Войти</button>
            <div>
                  <a class = 'links' href='#'>Забыли пароль?</a>
            </div>
            <div>
                  <a class = 'links' href='#'>Создать аккаунт</a>
            </div>
        </form>
      </div>
      
    )
  }
  
}
  




  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(< Form />);
  