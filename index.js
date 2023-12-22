const express = require('express');
const hbengine = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3010;

app.use(express.static('static'));

//Static folder (css, js, img, etc...)
app.use(express.static('static'));

//Init handlebars
app.engine('hbs', hbengine.engine(
  {
    defaultLayout : 'index',
    extname : '.hbs'
  }
));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Init middleware body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//Init middleware session + flashMessages
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'vkv6haXHpZZerI9srT1d',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  } // true: HTTPS only
}));

//Init middleware viewData
const fileViewMiddlewares = require('./Middlewares/View/viewData');
app.use(fileViewMiddlewares.initData);



//Init routers
const fileRtrMain = require('./Routers/mainRouter');
app.use('/', fileRtrMain.rtrMain);
const fileRtrUsers = require('./Routers/userRouter');
app.use('/users', fileRtrUsers.rtrUsers);


// //a bouger:
// app.get('/dashboard', (req, res) => {
//   res.render('dashboardUser');
// })

// app.get('/index', (req, res) => {
//   res.render('index');
// })

// app.get('/connexion', (req, res) => {
//   res.render('connexion');
// })
// //


// ----------------------------------------
app.listen(port, () => {
    console.log(`Remindr app listening at http://localhost:${port}`);
  });