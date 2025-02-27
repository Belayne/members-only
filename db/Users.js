const {query} = require ("./pool");

const Users = {
    getByID: async (id) => {
        const {rows} = await query(`SELECT * FROM users WHERE id = $1;`, [id]);
        const user = rows[0]
        return user;
    },

    getByUsername: async (username) => {
        const {rows} = await query(`SELECT * FROM users WHERE username = $1;`, [username]);
        const user = rows[0]
        return user;
    },

    getAll: async () => {
        const {rows} = await query(`SELECT * FROM users`);
        return rows;
    },

    insert: async ({username, password}) => {
        const role = "Guest";
        await query(`INSERT INTO users (username, password, role) VALUES ($1, $2, $3);`, [username, password, role]);
    },

    makeMember: async (id) => {
        await query(`UPDATE users SET role = 'Member' WHERE id = $1`, [id]);
    },

    makeAdmin: async (id) => {
        await query(`UPDATE users SET role = 'Admin' WHERE id = $1`, [id]);
    }
}

module.exports = {
    Users
}