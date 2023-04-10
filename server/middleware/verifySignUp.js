const db = require("../models");
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(500).send({
                // message: "Failed! Username is already in use!"
                message: "err_sgup_username_ex"
            });
            return;
        }
        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(500).send({
                    // message: "Failed! Email is already in use!"
                    message: "err_sgup_email_ex"
                });
                return;
            }
            next();
        });
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;