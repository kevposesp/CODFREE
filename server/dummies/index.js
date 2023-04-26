const db = require("../models");
const User = db.user;
const Article = db.article;
const Comment = db.comment;
var bcrypt = require("bcryptjs");

createClients = async () => {
    const user = await User.create({
        nombre: "user",
        username: "user",
        email: "user@gmail.com",
        password: bcrypt.hashSync("12345678", 8)
    }).then(user => {
        return user
    })

    const ax = await User.create({
        nombre: "ax",
        username: "ax",
        email: "ax@gmail.com",
        password: bcrypt.hashSync("12345678", 8)
    }).then(user => {
        return user
    })

    const art1 = await Article.create({
        id: 'art1',
        title: 'Articulo 1',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit fugit quis at, reprehenderit odio porro adipisci repellat nulla a voluptatum quia quibusdam libero, nesciunt amet ratione numquam placeat rerum suscipit!',
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe.",
        userId: ax.id
    }).then(art => {
        return art
    })
    
    const art2 = await Article.create({
        id: 'art2',
        title: 'Articulo 2',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit fugit quis at, reprehenderit odio porro adipisci repellat nulla a voluptatum quia quibusdam libero, nesciunt amet ratione numquam placeat rerum suscipit!',
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe.",
        userId: user.id
    }).then(art => {
        return art
    })

    await Comment.create({
        title: 'Titulo comentario',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sint cumque dicta laborum rem. Minus dicta, magni cum earum, quam, eligendi assumenda tempore rerum eius voluptatum omnis delectus impedit non?',
        articleId: art1.id,
        userId: user.id
    })
    await Comment.create({
        title: 'Titulo comentario',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sint cumque dicta laborum rem. Minus dicta, magni cum earum, quam, eligendi assumenda tempore rerum eius voluptatum omnis delectus impedit non?',
        articleId: art1.id,
        userId: user.id
    })
    await Comment.create({
        title: 'Titulo comentario',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sint cumque dicta laborum rem. Minus dicta, magni cum earum, quam, eligendi assumenda tempore rerum eius voluptatum omnis delectus impedit non?',
        articleId: art1.id,
        userId: user.id
    })
    
    await Comment.create({
        title: 'Titulo comentario',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sint cumque dicta laborum rem. Minus dicta, magni cum earum, quam, eligendi assumenda tempore rerum eius voluptatum omnis delectus impedit non?',
        articleId: art2.id,
        userId: ax.id
    })
    await Comment.create({
        title: 'Titulo comentario',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sint cumque dicta laborum rem. Minus dicta, magni cum earum, quam, eligendi assumenda tempore rerum eius voluptatum omnis delectus impedit non?',
        articleId: art2.id,
        userId: ax.id
    })
    await Comment.create({
        title: 'Titulo comentario',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sint cumque dicta laborum rem. Minus dicta, magni cum earum, quam, eligendi assumenda tempore rerum eius voluptatum omnis delectus impedit non?',
        articleId: art2.id,
        userId: ax.id
    })
};

const dummies = {
    createClients
}

module.exports = dummies