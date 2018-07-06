module.exports = function(sequelize, DataTypes) {
    var Note = sequelize.define("Note", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
    });
  
    Note.associate = function(models) {
      Note.belongsTo(models.User, {
        through: "userNote",
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Note;
  };