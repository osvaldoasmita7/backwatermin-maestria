import { initModels } from "../models/db/init-models";
import { sequelizeConn } from "../connection/sequelizedb";
const { companies, users_companies } = initModels(sequelizeConn);

export const getCompanies = async () => {
  try {
    return await companies.findAll();
  } catch (error) {
    throw error;
  }
};
export const getCompany = async (id: number) => {
  try {
    return await companies.findOne({ where: { id } });
  } catch (error) {
    throw error;
  }
};

export const getUserCompany = async (id_user: number) => {
  try {
    return await users_companies.findAll({
      where: { id_user },
      include: [
        {
          model: companies,
          as: "id_company_company",
          required: false,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};
