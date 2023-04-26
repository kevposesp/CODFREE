module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        img: {
            type: Sequelize.STRING,
            defaultValue: "https://picsum.photos/200/300"
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        username: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        }
    });
    return User;
};