const user = require('./user');

module.exports = (sequelize, DataTypes) =>{
  const photo = sequelize.define('photo', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    photo: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    fileName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, { timestamps: true, freezeTableName: true, tableName: 'photos' });
  return photo;
};
