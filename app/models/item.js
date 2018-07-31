module.exports = function(sequelize, Sequelize) {
    var Item = sequelize.define('Item', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        categoryId: {type: Sequelize.INTEGER, notEmpty: true},
        name: { type: Sequelize.STRING, notEmpty: true },
        image: { type: Sequelize.STRING, notEmpty: true },
        price: { type: Sequelize.DECIMAL(10,2) },
    });

    Item.associate = function(models) {
        Item.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Item;
}