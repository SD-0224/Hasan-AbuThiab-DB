import { DataTypes } from "sequelize";

const defineCategoryModel = (sequelize) => {
  return sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export default defineCategoryModel;
