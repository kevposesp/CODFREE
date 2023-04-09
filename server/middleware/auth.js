const { Op } = require("sequelize");
const db = require("../models");
const User = db.user

checkAccess = async (req, res, next) => {

    try {
        const userId = req.userId
        await User.findOne({
            where: {
                id: userId
            }
        }).then(user => {
            if (user) {
                res.status(200).send({
                    status: true
                })
            } else {
                res.status(403).send({
                    status: false
                })
            }
        })
    } catch (err) {
        res.status(403).send({
            message: err
        })
    }

}

const authMiddleware = {
    checkAccess
};

module.exports = authMiddleware;