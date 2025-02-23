
const psqlDate = {
    now: () => new Date().toISOString().slice(0, 19).replace('T', ' ')  //current UTC time in psql timestamp format.
}

module.exports = {
    psqlDate
}