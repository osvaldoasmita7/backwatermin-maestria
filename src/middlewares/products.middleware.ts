import { initModels } from "../models/db/init-models";
import { sequelizeConn } from "../connection/sequelizedb";
import { productsAttributes } from "../interfaces";
const { products } = initModels(sequelizeConn);

export const getAllProducts = async (filter: productsAttributes) => {
  try {
    let where = {};
    if (filter.id__company)
      where = { ...where, id__company: filter.id__company };
    if (filter.name) where = { ...where, name: filter.name };
    if (filter.price) where = { ...where, price: filter.price };
    if (filter.size) where = { ...where, size: filter.size };
    return await products.findAll({ where });
  } catch (error) {
    throw error;
  }
};
