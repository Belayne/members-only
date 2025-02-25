const { Router } = require("express");
const { userController, userValidation } = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/signup", userController.showSignupPage);
userRouter.post("/signup", userController.userValidation, userController.createUser);
userRouter.get("/login", userController.showLoginPage);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/member", userController.showMemberPage);
userRouter.post("/member", userController.makeMember);
userRouter.get("/admin", userController.showAdminPage);
userRouter.post("/admin", userController.makeAdmin);


module.exports.userRouter = userRouter;