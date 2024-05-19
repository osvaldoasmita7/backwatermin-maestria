import { companiesAttributes } from "./companies";

export interface usersAttributes {
  id?: number;
  username?: string;
  password?: string;
  active?: number;
  type_id?: number;

  companies?: companiesAttributes[];
}
