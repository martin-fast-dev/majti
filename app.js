const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');

const PORT = 4000;
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

  //Det är här man skriver koden för att convertera datan till PDF
  //En html template som fylls med datan från req.body converteras till PDF

  const html = fs.readFileSync(path.join(__dirname, '/public/constructor_template.html'), 'utf8');
  const options = { format: 'A4' };

  (async function run(){
    await pdf.create(html, options).toFile('../tornado.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });

    console.log('POSTED FROM CLIENT: ', req.body);
    res.sendFile(path.join(__dirname, '../tornado.pdf'));
    return;
  }());

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
