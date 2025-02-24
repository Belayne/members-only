

const messageController = {
    showMessageForm: (req, res) => {
        if(res.locals.user) {
            res.render("messageForm");
        }
    }
}