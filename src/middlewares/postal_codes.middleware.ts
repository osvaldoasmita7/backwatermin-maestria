import { initModels } from "../models/db/init-models";
import { sequelizeConn } from "../connection/sequelizedb";
const { postal_codes } = initModels(sequelizeConn);

export const SearchPostalCode = async (postalCode: string) => {
  try {
    console.log("postalCode", postalCode);
    return await postal_codes.findAll({ where: { cp: postalCode } });
  } catch (error) {
    throw error;
  }
};
