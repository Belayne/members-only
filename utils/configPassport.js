const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const {Pool} = require("pg");
const { Users } = require("../db/Users");
const { Strategy } = require("./localStrategy");

const pool = new Pool({
    connectionString: process.env.database_URL
})

passport.use(Strategy);

const sessionStore = new pgSession({
    pool: pool,
    tableName: 'user_sessions',
    createTableIfMissing: true
});

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.getByID(id);

        done(null, user);
    } catch(error) {
        done(error);
    }
});

module.exports.sessionStore = sessionStore;