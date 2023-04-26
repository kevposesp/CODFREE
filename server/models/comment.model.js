module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        title: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.TEXT
        }
    });
    return Comment;
};