const users = [
  { login: "Korgi", password: "Gav" },
  { login: "Kisa", password: "Mao" },
];

export const authentication = (login, password) => new Promise((resolve, reject) => {
  const user = users.find(item => item.login === login && item.password === password);
  setTimeout(() => {
    if (user) {
      resolve(user)
    } else {
      reject({ code: "400", message: "LOGIN ERROR" });
      // reject({ code: "410", message: "USER BLOCKED" });
      // reject({ code: "500", message: "SERVER ERROR" });
      // reject();
    }
  }, 1000);
});

export const registration = (login, password) => new Promise((resolve, reject) => {
  const user = users.find(item => item.login === login);
  const newUser = { login, password };
  const message = { message: "REGISTRATION_ERROR" };
  setTimeout(() => {
    if (user) {
      resolve(message)
    } else {
    users.push(newUser);
    console.log({ users });
    reject(newUser);
    }
  }, 1000);
});

export const passwordRecovery = (login) => new Promise((resolve, reject) => {
  const user = users.find(item => item.login === login);
  const message = { message: "NOT_REGISTERED_ERROR" };
  setTimeout(() => {
    if (user) {
      resolve({ user })
    } else {
    reject(message);
    }
  }, 1000);
});