const passport = require("passport");
const { Users } = require("../db/Users");
const bcrypt = require("bcryptjs");


const userController = {
    showSignupPage: (req, res, next) => {
        if(!res.locals.user) {
            res.render("signup");
        }
        else {
            throw new Error("Already logged in");
        }
    },

    showLoginPage: (req, res, next) => {
        if(!res.locals.user) {
            res.render("login");
        } else {
            throw new Error("Already logged in");
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
