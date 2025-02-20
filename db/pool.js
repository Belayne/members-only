const Pool = reqire("pg").Pool;

module.exports.pool = new Pool({
    connectionString: process.env.database_URL
})