const { psqlDate } = require("../utils/psqlDate");
const { query } = require("./pool")

const Messages = {
    getById: async (id) => {
        const {rows} = await query(`SELECT * FROM messages WHERE id = $1`, [id]);
        const messageData = rows[0];
        return messageData;
    },

    getAll: async () => {
        const {rows} = await query(`SELECT messages.id, message_text, title, timestamp, username FROM messages
            JOIN users on users.id=user_id;`)
        return rows;
    },

    insert: async ({title, message_text, user_id}) => {
        const timestamp = psqlDate.now();
        await query(`INSERT INTO messages (title, message_text, user_id, timestamp) VALUES ($1, $2, $3, $4);`, [title, message_text, user_id, timestamp]);
    }
}

module.exports = {
    Messages
}