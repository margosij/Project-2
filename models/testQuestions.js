module.exports = function(sequelize, DataTypes) {
  var TestQuestion = sequelize.define("TestQuestion", {
    questionText: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    questionAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    questionOptions: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  TestQuestion.associate = function(models) {
    // We're saying that a TestQuestion should belong to an TestList
    // A TestQuestion can't be created without an TestList due to the foreign key constraint
    TestQuestion.belongsTo(models.TestList, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return TestQuestion;
};
