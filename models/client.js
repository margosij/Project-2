module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    clientAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  Client.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Client.hasMany(models.CarePlan, {
      onDelete: "cascade"
    });
    Client.hasMany(models.EVVRecord, {
      onDelete: "cascade"
    });
  };

  return Client;
};
