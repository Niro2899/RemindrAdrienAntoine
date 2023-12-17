const fileRtrUsers = require('../../Routers/userRouter');

function NecessitateAuth(req, res, next) {
    if (req.session.user)
    {
        next();
    }
    else
    { 
        res.redirect('/users/login');
        return;
    }
}

function NecessitateNotAuth(req, res, next) {
    if (!req.session.user)
    {
        next();
    }
    else
    { 
        res.redirect('/users/dashboard');
        return;
    }
}

module.exports = { NecessitateAuth, NecessitateNotAuth };
