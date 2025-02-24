const passport = require("passport");
const { Users } = require("../db/Users");
const bcrypt = require("bcryptjs");
const { HTTPError } = require("../utils/HTTPError");


const userController = {
    showSignupPage: (req, res, next) => {
        try {
            if(!res.locals.user) {
                res.render("signup");
            }
            else {
                throw new HTTPError(400, "Already logged-in");
            }
        } catch(error) {
            next(error);
        }
    },

    showLoginPage: (req, res, next) => {
        if(!res.locals.user) {
            res.render("login");
        } else {
            throw new HTTPError(400, "Already logged-in");
        }
    },

    showMemberPage: (req, res) => {
        if(res.locals.user) {
            res.render("memberPage");
        } else {
            throw new HTTPError(401, "Only logged-in users can become members");
        }
    },

    makeMember: async (req, res, next) => {
        try {
            const {secret} = req.body;
            if(secret === process.env.secretPassphrase) {
                await Users.makeMember(res.locals.user.id);
                res.redirect("/");
            }
            else {
                res.redirect("/member");
            }
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {username, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await Users.insert({username, password: hashedPassword});
            res.redirect("/");
        } catch (error) {
            next(error);
        }
    },
    
    login: async (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login"
        })(req, res, next);
    },

    logout: async (req, res, next) => {
        req.logout((error) => {
            if(error) {
                return next(error);
            }
            res.redirect("/");
        })
    }
}

module.exports.userController = userController;
