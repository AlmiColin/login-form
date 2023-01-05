export const LOGIN_ERROR = "Извините! Неправильное сочетание имени пользователя и пароля.";
export const USER_ERROR = "Пользователь временно заблокирован.";
export const SERVER_ERROR = "Ошибка сервера.";
export const UNKNOWN_ERROR = "Неизвестная ошибка.";

export const MESSAGES_BY_CODE = {
  "500": SERVER_ERROR,
  "400": LOGIN_ERROR,
  "410": USER_ERROR,
};