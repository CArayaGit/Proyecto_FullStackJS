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
                "SELECT * FROM usuarios"
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
    
};
