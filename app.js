const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/form1', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/firstForm.html'));
});

app.get('/form2', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/secondForm.html'));
});

app.get('/', (request, response) => {
  response.send('No index found!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
