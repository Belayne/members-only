const { Messages } = require("../db/Messages");

const IndexController = {

    renderIndex: async (req, res, next) => {
        try {
            const messages = await Messages.getAll();
            res.render("index", {messages});
        } catch(error) {
            next(error)
        }
    }
}

module.exports.IndexController = IndexController;
