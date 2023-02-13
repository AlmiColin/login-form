const express = require('express');
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Kisa');
});

app.post('/authentication', (req, res) => {
  res.send('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Iktpc2EgTWFvIiwiaWF0IjoxNTE2MjM5MDIyfQ.q9jkuq8dW9rvb55uvVHmV0YIyavLYl0_7txnLqCQoVU');
})

app.post('/registration', (req, res) => {
  res.send('Регистрация завершена')
})

app.post('/password-recovery', (req, res) => {
  res.status(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});