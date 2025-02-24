const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: process.env.database_URL
});

module.exports = {
    query: (query_string, parameters, callback) => {
        return pool.query(query_string, parameters);
    }
}