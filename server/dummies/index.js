const db = require("../models");
const User = db.user;
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
};

const dummies = {
    createClients
}

module.exports = dummies