const { Messages } = require("../db/Messages");
const { HTTPError } = require("../utils/HTTPError");


const messageController = {
    showMessagePage: (req, res) => {
        if(res.locals.user) {
            res.render("messagePage");
        }
        else {
            throw new HTTPError(401, "Only logged in users can add messages.");
        }
    },

    createMessage: async (req, res, next) => {
        const {title, message_text} = req.body;
        await Messages.insert({title, message_text, user_id: res.locals.user.id});
        res.redirect("/");
    }
}

module.exports.messageController = messageController;