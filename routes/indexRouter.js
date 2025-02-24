const { Router } = require("express");
const { IndexController } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", IndexController.renderIndex);

module.exports.indexRouter = indexRouter;