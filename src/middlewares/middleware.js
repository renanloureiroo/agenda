
exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.user = req.session.user
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.session.save(() => res.redirect('/login/index'));
    return 
  }

  next();
}
