const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/form1', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/firstForm.html'));
});

app.get('/form2', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/secondForm.html'));
});

app.get('/', (request, response) => {
  response.send('No index found!');
});

app.post('/save', (req, res) => {
  console.log('POSTED FROM CLIENT: ', req.body);
  res.redirect('/');
  return;
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
