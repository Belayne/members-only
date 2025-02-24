const express = require("express");
const path = require("path");
const session = require("express-session");
const { Strategy } = require("./utils/localStrategy");
const { sessionStore } = require("./utils/configPassport");
const passport = require("passport");
const { indexRouter } = require("./routes/indexRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.use(session({
    store: sessionStore,
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60* 24 //A day in ms
    }
}));

app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

app.use(indexRouter);
app.use(userRouter);
app.use((error, req, res, next) => {
    res.status(error.code).send(error.code + " " + error.message);
})

app.listen(8000, () => console.log("App listening on port 8000"));




