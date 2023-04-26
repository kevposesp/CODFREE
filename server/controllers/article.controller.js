const db = require("../models");
const Article = db.article

const checkOwner = async(req, res) => {
    console.log("Hola");
    console.log(req.isOwner);
    res.status(200).send({
        isOwner: req.isOwner
    });
}

const articleController = {
    checkOwner
}

module.exports = articleController