const DataTypes = require("sequelize").DataTypes;
const _companies = require("./companies");
const _invoices = require("./invoices");
const _orders = require("./orders");
const _products = require("./products");
const _status = require("./status");
const _user_types = require("./user_types");
const _users = require("./users");

export const initModels = (sequelize: any) => {
  const companies = _companies(sequelize, DataTypes);
  const invoices = _invoices(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const status = _status(sequelize, DataTypes);
  const user_types = _user_types(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  products.belongsTo(companies, {
    as: "id__company_company",
    foreignKey: "id__company",
  });
  companies.hasMany(products, { as: "products", foreignKey: "id__company" });
  orders.belongsTo(products, {
    as: "idProduct_product",
    foreignKey: "idProduct",
  });
  products.hasMany(orders, { as: "orders", foreignKey: "idProduct" });
  invoices.belongsTo(status, {
    as: "id_status_status",
    foreignKey: "id_status",
  });
  status.hasMany(invoices, { as: "invoices", foreignKey: "id_status" });
  users.belongsTo(user_types, { as: "type", foreignKey: "type_id" });
  user_types.hasMany(users, { as: "users", foreignKey: "type_id" });
  invoices.belongsTo(users, {
    as: "created_by_user",
    foreignKey: "created_by",
  });
  users.hasMany(invoices, { as: "invoices", foreignKey: "created_by" });

  return {
    companies,
    invoices,
    orders,
    products,
    status,
    user_types,
    users,
  };
};
