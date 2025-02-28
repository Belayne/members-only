
const psqlDate = {
    now: () => new Date().toISOString().slice(0, 19).replace('T', ' '),  //current UTC time in psql timestamp format.
    intervalToString: (interval) => {
        const string = Object.values(interval)[0] + " " + Object.keys(interval)[0] + " ago";
        return string;
    }
}

module.exports = {
    psqlDate
}