const express = require('express');
const hbengine = require('express-handlebars');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.engine('hbs', hbengine.engine(
  {
    defaultLayout : 'index',
    extname : '.hbs'
  }
));

app.set('view engine', 'hbs');

//Init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//Init routers
const fileRtrUsers = require('./Routers/userRouter');
app.use('/users', fileRtrUsers.rtrUsers);

app.get('/dashboard', (req, res) => {
  res.render('dashboardUser');
})

app.get('/index', (req, res) => {
  res.render('index');
})

app.get('/connexion', (req, res) => {
  res.render('connexion');
})



// ----------------------------------------
app.listen(port, () => {
    console.log(`Remindr app listening at http://localhost:${port}`);
  });