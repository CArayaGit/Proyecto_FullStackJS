require('dotenv').config()
const { Client } = require('pg')
const { Pool } = require("pg");

const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:controlactivo@localhost:5432/autopista";

const pool = process.env.DATABASE_URL
    ? new Pool({
          connectionString: connectionString,
          ssl: { rejectUnauthorized: false },
      })
    : new Pool({ connectionString });


const getUsersDB = async () => {
    const client = await pool.connect();
        try {
            const respuesta = await client.query(
                "SELECT id_user, nombre_user, email, admin FROM usuarios ORDER BY id_user ASC"
            );
            return {
                ok: true,
                users: respuesta.rows,
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                msg: error.message,
            };
        } finally {
            client.release();
        }
    };

const createUserDB = async ({ nombre, email, hashPassword }) => {
    const client = await pool.connect();
    const query = {
        text: "INSERT INTO usuarios (nombre_user, email, password) VALUES ($1,$2,$3) RETURNING *",
        values: [nombre, email, hashPassword],
    };
    
    try {
        const respuesta = await client.query(query);
        console.log(respuesta);
        const { id } = respuesta.rows[0];
        return {
            ok: true,
            users: respuesta.rows,
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: "Ya existe el email registrado",
            };
        } return {
            ok: false,
            msg: error.message,
            };
    } finally {
        client.release();
    }
};

const getUserDB = async ({email}) => {
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM usuarios WHERE email = $1",
        values: [email],
    };
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            user: respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

const updateUserDB = async ({ nombre, email, hashPassword }) => {
    const client = await pool.connect();
    const query = {
        text: "UPDATE usuarios SET nombre_user=$1, email=$2, password=$3 WHERE email=$2",
        values: [nombre, email, hashPassword],
    };

    try {
        const respuesta = await client.query(query);
        console.log(respuesta.rows);
        return {
            ok: true,
            users: respuesta.rows,
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

const deleteUserDB = async ({ id_user }) => {
    const client = await pool.connect();
    const query = {
        text: "DELETE FROM usuarios WHERE id_user=$1;",
        values: [id_user],
    };
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            user: respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

const getSalasDB = async () => {
    const client = await pool.connect();
        try {
            const respuesta = await client.query(
                "SELECT * FROM salas"
            );
            return {
                ok: true,
                users: respuesta.rows,
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                msg: error.message,
            };
        } finally {
            client.release();
        }
    };

const getEquiposDB = async () => {
    const client = await pool.connect();
        try {
            const respuesta = await client.query(
                "SELECT * FROM equipos"
            );
            return {
                ok: true,
                users: respuesta.rows,
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                msg: error.message,
            };
        } finally {
            client.release();
        }
    };

module.exports = {
    getUsersDB,
    createUserDB,
    getUserDB,
    updateUserDB,
    deleteUserDB,
    getSalasDB,
    getEquiposDB
};
