const { Messages } = require("../db/Messages");
const { psqlDate } = require("../utils/psqlDate");

const IndexController = {

    renderIndex: async (req, res, next) => {
        try {
            let messages = await Messages.getAll();
            messages = messages.map(message => {
                message.timestamp = psqlDate.intervalToString(message.interval);
                return message;
            });
            res.render("index", {messages});
        } catch(error) {
            next(error)
        }
    }
}

module.exports.IndexController = IndexController;
