module.exports = function(sequelize, DataTypes) {
  var TestList = sequelize.define("TestList", {
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    testCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    testRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    testCreatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  TestList.associate = function(models) {
    // Associating TestList with TestQuention and TestRecord
    // When an TestList is deleted, also delete any associated Posts
    TestList.hasMany(models.TestQuestion, {
      onDelete: "cascade"
    });
    TestList.hasMany(models.TestRecord, {
      onDelete: "cascade"
    });
  };

  return TestList;
};
