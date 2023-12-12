const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

//Init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//Init handlebars 
app.engine('handlebars', engine.engine( {
  defaultLayout: "index",
  extname: 'hbs'
}));

//Init routers
const fileRtrUsers = require('./Routers/userRouter');
app.use('/users', fileRtrUsers.rtrUsers);


// ----------------------------------------
app.listen(port, () => {
    console.log(`Remindr app listening at http://localhost:${port}`);
  });