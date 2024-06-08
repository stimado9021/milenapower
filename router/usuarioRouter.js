const express = require("express");
const router = express.Router();
const session = require("express-session");
const Usuario = require("../models/usuarioModel");

//ruta hacia el dashboard despuies de loguearse
router.get("/", (req, res) => {
  res.render("dashboard", {
    users: req.session.users,
    isLogin: req.session.isLogin,
  });
});
//ruta hacia elprofile en contruccion todavia
router.get("/profile", (req, res) => {
  res.render("profile");
});

//ruta para loguearse
router.post("/", async (req, res) => {
  const { usuario, password } = req.body;

  const user = await Usuario.find({ usuario: usuario.toLowerCase() }).exec();
  const logger = user[0];

  if (!logger) {
    res.render("error404", { message: " Usuario No Esta En Base de Datos " });
  }else{
   if (logger.password !== password.toLowerCase()) {
    res.render("error404", { message: " falla al autentificar usuario " });
  } else {
    req.session.isLogin = true;
    req.session.users = usuario;
    res.redirect("usuario");
  }
  }

  
});

module.exports = router;
