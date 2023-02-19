const headers = {
  'content-type': 'application/json; charset=utf-8',
};

export const jsonPost = (url, body) => fetch(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(body),
}).then(res => {
  const type = res.headers.get('content-type');
  const method = type && type.includes('json') ? 'json': 'text';
  return Promise.all([res, res[method]()]);
})
.then(([res, body]) => {
  const { status } = res;
  if (status !== 200) {
    return Promise.reject({ status, body });
  }
  return body;
});

export const authentication = (login, password) => jsonPost('/authentication', {
  login,
  password,
});

export const registration = (login, password) => jsonPost('/registration', {
  login,
  password,
});

export const session = () => fetch('/session', {headers})
  .then(res => {
    const { status } = res;
    if (status !== 200) {
      return Promise.reject(res);
    }
    return res.json();
  });

  export const logout = () => fetch('/logout', {headers});