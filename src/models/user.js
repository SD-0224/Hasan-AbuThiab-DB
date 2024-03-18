import { DataTypes } from 'sequelize';

const defineUserModel = sequelize => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true  
    },

  });
};

export default defineUserModel;
