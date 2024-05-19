import { Model, Table, Column, DataType, Index } from "sequelize-typescript";
import { companiesAttributes } from "./companies";

export interface usersAttributes {
  id: number;
  username: string;
  password?: string;
  active?: number;
  typeId?: number;
}
export interface ILogin {
  ok: boolean;
  user: {
    username: string;
    id: number;
    token: string;
    active: number;
    type_id: number;
    companies?: companiesAttributes[];
  };
}
