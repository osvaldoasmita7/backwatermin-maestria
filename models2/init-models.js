var DataTypes = require("sequelize").DataTypes;
var _companies = require("./companies");
var _invoices = require("./invoices");
var _orders = require("./orders");
var _postal_codes = require("./postal_codes");
var _products = require("./products");
var _status = require("./status");
var _user_types = require("./user_types");
var _users = require("./users");
var _users_companies = require("./users_companies");

function initModels(sequelize) {
  var companies = _companies(sequelize, DataTypes);
  var invoices = _invoices(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var postal_codes = _postal_codes(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);
  var user_types = _user_types(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users_companies = _users_companies(sequelize, DataTypes);

  invoices.belongsTo(companies, { as: "id_company_company", foreignKey: "id_company"});
  companies.hasMany(invoices, { as: "invoices", foreignKey: "id_company"});
  products.belongsTo(companies, { as: "id__company_company", foreignKey: "id__company"});
  companies.hasMany(products, { as: "products", foreignKey: "id__company"});
  users_companies.belongsTo(companies, { as: "id_company_company", foreignKey: "id_company"});
  companies.hasMany(users_companies, { as: "users_companies", foreignKey: "id_company"});
  orders.belongsTo(invoices, { as: "id_invoice_invoice", foreignKey: "id_invoice"});
  invoices.hasMany(orders, { as: "orders", foreignKey: "id_invoice"});
  orders.belongsTo(products, { as: "idProduct_product", foreignKey: "idProduct"});
  products.hasMany(orders, { as: "orders", foreignKey: "idProduct"});
  invoices.belongsTo(status, { as: "id_status_status", foreignKey: "id_status"});
  status.hasMany(invoices, { as: "invoices", foreignKey: "id_status"});
  users.belongsTo(user_types, { as: "type", foreignKey: "type_id"});
  user_types.hasMany(users, { as: "users", foreignKey: "type_id"});
  invoices.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(invoices, { as: "invoices", foreignKey: "created_by"});
  users_companies.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(users_companies, { as: "users_companies", foreignKey: "id_user"});

  return {
    companies,
    invoices,
    orders,
    postal_codes,
    products,
    status,
    user_types,
    users,
    users_companies,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
