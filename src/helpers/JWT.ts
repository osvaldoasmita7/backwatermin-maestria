import { Request, Response } from "express";
import { companiesAttributes, usersAttributes } from "../interfaces";
import { GetUserById } from "../middlewares/auth.middleware";
import { ILogin } from "../interfaces/IUser";
import { getUserCompany } from "../middlewares/companies.middleware";

const jwt = require("jsonwebtoken");

export const generateToken = (
  id: number,
  username: string,
  type_id: number,
  active: number,
  companies?: companiesAttributes[]
) => {
  return new Promise((resolve, reject) => {
    let payload = { username, id, type_id, active, companies };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "15d" },
      function (error: any, token: any) {
        if (error) {
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
// Renovar token
export const renewToken = async (id: number): Promise<ILogin> => {
  try {
    //  obtener el usuario por UID
    const user = await GetUserById(id);

    user.companies = [];
    if (user.type_id === 2 && user.id) {
      const companies = await getUserCompany(user.id);
      for (const item of companies) {
        user.companies?.push(item.dataValues.id_company_company.dataValues);
      }
    }
    // Generamos el token
    const token = await generateToken(
      user.id || 0,
      user.username || "",
      user.type_id || 0,
      user.active || 0,
      user.companies
    );

    return {
      ok: true,
      user: {
        active: user.active || 0,
        id: user.id || 0,
        username: user.username || "",
        token: typeof token == "string" ? token : "" || "",
        type_id: user.type_id || 0,
        companies: user.companies,
      },
    };
  } catch (error) {
    return {
      ok: false,
      user: {
        id: 0,
        token: "",
        type_id: 0,
        active: 0,
        username: "",
      },
    };
  }
};
export const verifyJWT2 = (token = "") => {
  try {
    if (!token) throw "Sin token";

    const { id, username, type_id, active } = jwt.verify(
      token,
      process.env.JWT_KEY
    );

    return { ok: true, id, username, type_id, active };
  } catch (error) {
    return {
      ok: false,
      id: 0,
      username: null,
      type_id: 0,
      active: 0,
    };
  }
};
