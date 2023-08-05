'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.ListTask, {
        foreignKey: 'listTask_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deadline: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING
      },
      listTask_id: {
        type: DataTypes.INTEGER
      }
    }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};