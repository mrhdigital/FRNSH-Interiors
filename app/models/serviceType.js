module.exports = function(sequelize, DataTypes) {
    var serviceType = sequelize.define("serviceType", {
        serviceid: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        serviceName: {type: DataTypes.STRING,allowNull: false,notEmpty: true,unique: true }
        
    });
    return serviceType;
};