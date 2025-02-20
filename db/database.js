const pool = require("./pool");

function query(query_string, parameters) {
    return pool.query(query_string, parameters);
}

async function getUserByUsername(username) {
    const {rows} = await query(`SELECT * FROM users WHERE username = $1;`, [username]);
    const user = rows[0]
    return user;
}

const db = {
    getUserByUsername
}

module.exports.db = db;