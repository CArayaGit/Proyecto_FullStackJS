const express = require("express");
const { getUsers, createUser, loginUser, updateUser, deleteUser, getSalas, getEquipos } = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/requireAuth");
const { requireData } = require("../middlewares/requireData");
const router = express.Router();


router.get("/users", getUsers);
router.post("/users", requireData, createUser);
router.post("/login", loginUser);
router.put("/editar/:email", requireAuth, updateUser);
router.delete("/editar/:id_user", requireAuth, deleteUser);

router.get("/salas", getSalas);
router.get("/equipos", requireAuth, getEquipos);

module.exports = router;