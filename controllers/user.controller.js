const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUsersDB, createUserDB, getUserDB, updateUserDB, deleteUserDB } = require("../database/db");


const getUsers = async (req, res) => {
    const respuesta = await getUsersDB();
    if(!respuesta.ok) {
        return res.status(500).json({ OK: false, msg: respuesta.msg });
    }
    return res.json({ ok: true, users: respuesta.users});
};

const createUser = async (req, res) => {
    try{
        const { nombre, email, password } = req.body
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const respuesta = await createUserDB({
            nombre,
            email,
            hashPassword
        });
        console.log(respuesta);

        if(!respuesta.ok) {
            throw new Error(respuesta.msg);
        }

        const payload = {id: respuesta.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.json({
            ok: true,
            token,
        });
    } catch(error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email?.trim() || !password?.trim()) {
            throw new Error("Algunos campos están vacios");
        }

        const respuesta = await getUserDB({email});
        if (!respuesta.ok) {
            throw new Error(respuesta.msg);
        } if (!respuesta.user) {
            throw new Error("No existe el email registrado");
        }

        const { user } = respuesta;
        const comparePassword = await bcrypt.compare(password, user.password);
        //const comparePassword = await password == user.password;
        if (!comparePassword) {
            throw new Error("Contraseña incorrecta");
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    
    try{
        const { nombre, email, password } = req.body
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const respuesta = await updateUserDB({
            nombre,
            email,
            hashPassword,
        });
        console.log(respuesta);

        if(!respuesta.ok) {
            throw new Error(respuesta.msg);
        }

        const payload = {id: respuesta.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.json({
            ok: true,
            msg: respuesta.msg,
        });
    } catch(error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteUser = async (req, res) => {      
    try{
        const { email } = req.body
        const respuesta = await deleteUserDB({ email });
        console.log(respuesta);

        if(!respuesta.ok) {
            throw new Error(respuesta.msg);
        }

        const payload = {id: respuesta.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.json({
            ok: true,
            msg: respuesta.msg,
        });
    } catch(error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser
};
