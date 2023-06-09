module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        text: {
            type: Sequelize.TEXT
        }
    });
    return Article;
};