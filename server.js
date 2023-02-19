const DB_FILE = './db.json';

const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const db = require(DB_FILE);

const port = 3001;
const maxErrorCount = 3;
const timeout = 10000;

const app = express();

const saveDB = () => fs.writeFile(
  DB_FILE,
  JSON.stringify(db, null, 4),
  'utf-8',
  () => {}
);

const createStore = (ipBase = {}, defaultNum = 0) => ({
  get: ip => ipBase[ip] || defaultNum,
  count: ip => ipBase[ip] = (ipBase[ip] || defaultNum) + 1,
  reset: ip => ipBase[ip] = defaultNum,
});

const ipStore = createStore();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Kisa'); 
});

app.get('/session', (req, res) => {
  const token = req.cookies['access_token'];
  const id = db.sessions[token];
  const user = db.users.find(item => item.id === id);
  if (!user) {
    return res.status(403).end();
  }
  return res.json(user);
})

app.get('/logout', (req, res) => {
  return res.clearCookie('access_token').end();
})

app.post('/authentication', (req, res) => { 
  if ( ipStore.get(req.ip) > maxErrorCount ) {
    return res.status(400).end();
  }

  const { login, password } = req.body || {};
  const hasCredentials = !!(login && password);
  const user = hasCredentials && db.users.find(
    item => item.login === login && item.password === password
  );

  if (!user) {
    const count = ipStore.count(req.ip);
    if (count > maxErrorCount) {
      setTimeout(() => {
        ipStore.reset(req.ip);
      }, timeout);
      return res.status(410).json({ timeout });
    }     
    return res.status(400).end();
  }

  const token = crypto.randomBytes(16).toString('base64');
  db.sessions[token] = user.id;
  ipStore.reset(req.ip);
  saveDB();

  return res
    .cookie('access_token', token, {
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
      secure: true, 
      sameSite: true,
    })
    .end(); 
})

app.post('/registration', (req, res) => {
  const { login, password } = req.body || {};

  if (!(login && password)) {
    return res.status(400).end();
  }

  const user = db.users.find(
    item => item.login === login
  );

  if (user) {
    return res.status(403).end();
  }

  const id = 1 + db.users.reduce(
    (lastId, item) => item.id > lastId ? item.id : lastId, 0);
  db.users.push({ id, login, password });
  saveDB();
  return res.send('Регистрация прошла успешно')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});