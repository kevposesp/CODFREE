const db = require("../models");
const User = db.user;
const Article = db.article;

checkArticleOwner = (req, res, next) => {
    const { id } = req.body
    try {
        Article.findOne({
            where: {
                id
            }
        }).then(article => {
            if(req.statusUser) {
                if (article.userId == req.userId) {
                    req.isOwner = true
                } else {
                    req.isOwner = false
                }
            } else {
                req.isOwner = false
            }
            next()
        })
    } catch (error) {
        console.log(error);
        return
    }
};

const articleMiddleware = {
    checkArticleOwner
};

module.exports = articleMiddleware;