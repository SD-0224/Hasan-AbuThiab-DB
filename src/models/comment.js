import { DataTypes } from 'sequelize';

const defineCommentModel = sequelize => {
  return sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
};

export default defineCommentModel;
