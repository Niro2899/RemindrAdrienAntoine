function showHome(req, res) {
  res.render('homepage', req.viewData);
}

module.exports = {
    showHome
    };