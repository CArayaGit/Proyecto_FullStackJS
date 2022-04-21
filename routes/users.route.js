const express = require("express");
const { getUsers, createUser, loginUser, updateUser, deleteUser } = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/requireAuth");
const { requireDatos } = require("../middlewares/requireDatos");
const router = express.Router();


router.get("/users", getUsers);
router.post("/users", requireDatos, createUser);
router.post("/login", loginUser);
router.put("/editar/:email", requireAuth, updateUser);
router.delete("/editar/:id_user", requireAuth, deleteUser);

module.exports = router;