import { initModels } from "../models/db/init-models";
import { sequelizeConn } from "../connection/sequelizedb";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { users } = initModels(sequelizeConn);
interface Props {
  username?: string;
  type_id?: number;
  active?: boolean;
  password?: string;
}
export const GetAllUsers = async ({ type_id, username, active }: Props) => {
  let where = {};
  if (type_id) where = { ...where, type_id };
  if (username) where = { ...where, username };
  if (active !== null || active !== undefined) where = { ...where, username };
  return await users.findAll({
    where,
  });
};
export const CreateUser = async ({
  type_id,
  username,
  active,
  password,
}: Props) => {
  return await users.create({
    type_id,
    username,
    active,
    password,
  });
};
