module.exports = function (sequelize, DataTypes) {
    var Packages = sequelize.define("Packages", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    
    }, {
        timestamps: false
    });

  Packages.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Packages.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: true
      },
      as: 'venue'
    });

    Packages.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: true
      },
      as: 'photographer'
    });

    Packages.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: true
      },
      as: 'music'
    });

    Packages.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: true
      },
      as: 'florist'
    });

    

    Packages.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: true
      },
      as: 'kitchen'
    });

    Packages.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: true
      },
      as: 'door'
    });
  };


    return Packages;
}
