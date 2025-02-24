const { Router } = require("express");
const { messageController } = require("../controllers/messageController");


const messageRouter = Router();

messageRouter.get("/new-message", messageController.showMessagePage);
messageRouter.post("/new-message", messageController.createMessage);

module.exports.messageRouter = messageRouter;