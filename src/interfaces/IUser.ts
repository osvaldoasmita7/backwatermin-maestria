import { Model, Table, Column, DataType, Index } from "sequelize-typescript";

export interface usersAttributes {
  id: number;
  username: string;
  password?: string;
  active?: number;
  typeId?: number;
}
