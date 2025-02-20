const { pool } = require("./pool");

function query(query_string, parameters) {
    return pool.query(query_string, parameters);
}

async function getUserByUsername(username) {
    const {rows} = await query(`SELECT * FROM users WHERE username = $1;`, [username]);
    const user = rows[0]
    return user;
}

async function getUserByID(id) {
    const {rows} = await query(`SELECT * FROM users WHERE id = $1;`, [id]);
    const user = rows[0]
    return user;
}

const db = {
    getUserByUsername,
    getUserByID
}

module.exports.db = db;