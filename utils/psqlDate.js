
const psqlDate = {
    now: () => new Date().toISOString().slice(0, 19).replace('T', ' '),  //current UTC time in psql timestamp format.
    intervalToString: (interval) => {
        if(Object.keys(interval).length === 0) return "now";
        const value = Object.values(interval)[0];
        const key = value == 1? Object.keys(interval)[0].slice(0, -1): Object.keys(interval)[0];
        const string = value + " " + key + " ago";
        return string;
    }
}

module.exports = {
    psqlDate
}