const Sequelize = require("sequelize");
export const sequelizeConn = new Sequelize(
  "waterdb1",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  },
  { timestamps: false }
);
