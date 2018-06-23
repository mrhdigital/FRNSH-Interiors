//For grabbing providers from the database
module.exports = function(sequelize, Sequelize) {
    var Providers = sequelize.define("Providers", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        img: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        capacity: {
            type: Sequelize.STRING
        },
        budget: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        }
    },{
        timestamps: false
    });
        return (Providers);
};



