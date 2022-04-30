const express = require("express");
const { getUsers, createUser, loginUser, updateUser, deleteUser, getSalas, getEquipos, getNivel } = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/requireAuth");
const { requireData } = require("../middlewares/requireData");
const router = express.Router();


router.get("/users", requireAuth, getUsers);
router.post("/users", requireData, createUser);
router.post("/login", loginUser);
router.put("/editar/:email", requireAuth, updateUser);
router.delete("/editar/:id_user", requireAuth, deleteUser);

router.get("/salas", getSalas);
router.get("/equipos", requireAuth, getEquipos);
router.get("/nivel", requireAuth, getNivel);

module.exports = router;