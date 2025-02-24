const { Router } = require("express");
const { userController } = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/signup", userController.showSignupPage);
userRouter.post("/signup", userController.createUser);
userRouter.get("/login", userController.showLoginPage);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout)

module.exports.userRouter = userRouter;