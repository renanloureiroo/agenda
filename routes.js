const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");

route.get("/", homeController.paginaInicial);
route.get("/index", homeController.paginaLogin)
route.post("/", homeController.trataPost);

module.exports = route;
