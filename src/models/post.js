import { DataTypes } from 'sequelize';

const definePostModel = sequelize => {
  return sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
};

export default definePostModel;
