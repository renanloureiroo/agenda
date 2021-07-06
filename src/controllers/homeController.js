// const HomeModel = require("../models/HomeModel");

// HomeModel.create({
//   title: "Um título de testes",
//   description: "Uma descrição de testes",
// })
//   .then((dados) => console.log(dados))
//   .catch((e) => console.log(e));

exports.paginaInicial = (req, res) => {
  res.render("index");
};

exports.paginaLogin = (req, res) => {
  res.render('login');
};

exports.trataPost = (req, res) => {
  res.send(req.body);
};
