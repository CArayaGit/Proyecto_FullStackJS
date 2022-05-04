const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/salas", (req, res) => res.render("salas"));
router.get("/selecSala", (req, res) => res.render("selecSala"));
router.get("/editUser", (req, res) => res.render("editUser"));
router.get("/editUserB", (req, res) => res.render("editUserB"));
router.get("/eventos", (req, res) => res.render("eventos"));
//router.get("/maps", (req, res) => res.render("maps"));


module.exports = router;