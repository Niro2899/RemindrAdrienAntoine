const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

//Init routers
const fileRtrUsers = require('./Routers/userRouter');
app.use('/users', fileRtrUsers.rtrUsers);


// ----------------------------------------
app.listen(port, () => {
    console.log(`Remindr app listening at http://localhost:${port}`);
  });