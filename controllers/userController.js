const passport = require("passport");
const { Users } = require("../db/Users");
const bcrypt = require("bcryptjs");
const { HTTPError } = require("../utils/HTTPError");
const { body, validationResult } = require("express-validator");



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

    //validation chain before POST
    userValidation: [
        body("username").trim()
            .isAlphanumeric().withMessage("Username can only contain letters and numbers.")
            .isLength({min: 3, max: 20}).withMessage("Username must be between 3 and 20 characters.")
            .custom(async username => {
                const user = await Users.getByUsername(username);
                if(user) {
                    throw new Error("Username already in use.")
                } //But here it works without returning true...
            }),

        body("password").isLength({min: 8, max: 50}).withMessage("Password must be at least 8 characters long.")
            .isStrongPassword().withMessage("Password must contain at least one uppercase letter, one symbol and one number."),

        body("confirmPassword").custom((confirm, {req}) => {
            if(confirm != req.body.password) {
                throw new Error("Passwords do not match.")
            } else return true; //if you don't return true it will not validate with message "Invalid value"
        }),
        
    ],

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

    showAdminPage: (req, res) => {
        if(res.locals.user) {
            res.render("adminPage");
        } else {
            throw new HTTPError(401, "Only logged-in users can become admin");
        }
    },

    makeAdmin: async (req, res, next) => {
        try {
            const {secret} = req.body;
            if(secret === process.env.secretAdminPassphrase) {
                await Users.makeAdmin(res.locals.user.id);
                res.redirect("/");
            }
            else {
                res.redirect("/admin");
            }
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("signup", {errors: errors.array()});
        }
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
