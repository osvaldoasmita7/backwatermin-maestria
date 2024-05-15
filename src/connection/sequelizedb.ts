const Sequelize = require("sequelize");
export const sequelizeConn = new Sequelize(
  "waterdb",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  },
  { timestamps: false }
);
