module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        text: {
            type: Sequelize.STRING
        }
    });
    return Article;
};