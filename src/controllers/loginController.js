const Login = require("../models/loginModel")

exports.index = (req, res) => {
  console.log(req.session.user)
  res.render('login');
};
exports.register = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.register()
    
    if(login.errors.length > 0 ){
      req.flash('errors', login.errors)
      req.session.save(function() {
        return res.redirect('back')
      })
      return
  }

  req.flash('success', 'Seu usuário foi criado com sucesso.')
  req.session.save(function(){
    return res.redirect('back')
  })
  } catch(e){
    console.log(e)
    return res.send(login.errors);
  }
}

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.login()
    
    if(login.errors.length > 0 ){
      req.flash('errors', login.errors)
      req.session.save(function() {
        return res.redirect('back')
      })
      return
  }
  req.flash('success', 'Login efetuado com sucesso.')
  req.session.user = login.user
  req.session.save(function(){
    return res.redirect('back')
  })
  } catch(e){
    console.log(e)
    return res.send(login.errors);
  }
}

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/')
}