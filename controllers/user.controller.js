const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUsersDB } = require("../database/db");


const getUsers = async (req, res) => {
    const respuesta = await getUsersDB();
    if(!respuesta.ok) {
        return res.status(500).json({ OK: false, msg: respuesta.msg });
    }
    return res.json({ ok: true, users: respuesta.users});
};



module.exports = {
    getUsers,
    
};
