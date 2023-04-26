const db = require("../models");
const User = db.user
const Comment = db.comment

const readComments = async (req, res) => {
    const { id } = req.body
    if (req.statusUser) {
        await Comment.findAll({
            include: {
                model: User,
                attributes: ['id', 'img', 'name', 'username']
            },
            where: {
                articleId: id
            },
            attributes: ['id', 'title', 'text', 'articleId', 'userId']
        }).then(comments => {
            if (comments) {
                res.status(200).send({
                    message: "read_comments_ok",
                    comments
                });
            } else {
                res.status(500).send({
                    message: "error_not_found"
                });
            }
        })
    } else {
        res.status(200).send({
            message: "not_auth"
        })
    }
}

const createComment = async (req, res) => {
    const { idArticle, title, text } = req.body
    try {
        await Comment.create({
            articleId: idArticle,
            title,
            text,
            userId: req.userId
        }).then(comment => {
            res.send({ message: "create_comment_ok", comment })
        })
    } catch (error) {
        res.status(500).send({ message: "error_create_comment", error})
    }
}

const commentController = {
    readComments,
    createComment
}

module.exports = commentController