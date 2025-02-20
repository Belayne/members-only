const LocalStrategy = require("passport-local").Strategy;
const { db } = require("../db/database");
const bcrypt = require("bcryptjs");


const verifyFunction = async (username, password, done) => {
    try {
        const user = await db.getUserByUsername(username);

        if(!user) {
            return done(null, false, {message: "Incorrect username"});
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return done(null, false, {message: "Incorrect password"});
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}

module.exports.Strategy = new LocalStrategy(verifyFunction);