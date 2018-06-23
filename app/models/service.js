module.exports = function(sequelize, DataTypes) {
    var service = sequelize.define("service", {
        providerid: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        serviceid: { type: DataTypes.INTEGER,allowNull: false,notEmpty: true },
        company: {type: DataTypes.STRING},
        firstname: {type: DataTypes.STRING,allowNull: false,notEmpty: true},
        lastname: {type: DataTypes.STRING,allowNull: false,notEmpty: true},
        email: {type: DataTypes.STRING,isUnique: true,allowNull: false,
            validate: {isEmail: true}
        },
        phone: {type: DataTypes.STRING,allowNull: false,unique: true,
            validate: {
                isValidPhoneNo: function(value) {
                    if (!value) return value;
                    var regexp = /^[0-9]+$/;
                    var values = (Array.isArray(value)) ? value : [value];

                    values.forEach(function(val) {
                        if (!regexp.test(val)) {
                            throw new Error("Number only is allowed.");
                        }
                    });
                    return value;
                }
            }
        },
        description: {type: DataTypes.TEXT,
            validate: {len: [2, 500]}
        },
        Address1: {type: DataTypes.TEXT,allowNull: false,notEmpty: true},
        Address2: {type: DataTypes.TEXT},
        zipCode: {type: DataTypes.INTEGER,allowNull: false,notEmpty: true,
            validate: {len: [5]}
        },
        insured: {type: DataTypes.BOOLEAN},
        licensed: {type: DataTypes.BOOLEAN}
    });
    return service;
};