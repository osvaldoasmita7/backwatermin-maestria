// Importamos dependencias
import { Request, Response } from "express";
const bcrypt = require("bcryptjs");

// Importamos middlewares
import { CreateUser, GetAllUsers } from "../middlewares/auth.middleware";
// Importamos interfaces
import { usersAttributes } from "../interfaces";
// Importamos helpers
import { generateToken, renewToken, verifyJWT2 } from "../helpers/JWT";
import { getUserCompany } from "../middlewares/companies.middleware";

/**
 * Función para iniciar sesión
 * @param req
 * @param res
 * @returns
 */
export const Login = async (req: Request, res: Response) => {
  try {
    // Extraemos parametros del body
    const { active, username, password } = req.body;
    // Traemos los usuarios de la base con el filtro
    const users = await GetAllUsers({ active, username });
    // Buscamos el que coincida con la contraseña
    const user: usersAttributes = users.find((x: usersAttributes) =>
      bcrypt.compareSync(`${password}`, x.password)
    );
    // Si no encontramos usuario
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "El email y/o contraseña son incorrectos o el usuario no existe o tu cuenta se encuentra inhabilitada",
      });
    }
    // Si el usuario no está activo
    if (!user.active) {
      return res.status(404).json({
        ok: false,
        msg: "Tu cuenta se encuentra inhabilitada",
      });
    }
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

    // Retornamos la respuesta
    return res.json({
      ok: true,
      user: {
        name: user.username,
        id: user.id,
        type_id: user.type_id,
        token,
        active: user.active,
        companies: user.companies,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, hable con el administrador",
      error,
    });
  }
};
/**
 * Función para registrar un usuario
 * @param req
 * @param res
 * @returns
 */
export const Register = async (req: Request, res: Response) => {
  try {
    // Extraemos parametros del body
    const { type_id, username, password, confirmPassword } = req.body;
    if (!password || !confirmPassword || password !== confirmPassword)
      return res.status(400).json({
        ok: false,
        message:
          "Las contraseñas no coinciden o la confirmación no la enviaste",
      });
    // Traemos los usuarios de la base con el filtro
    const users = await GetAllUsers({ username });
    // Si encontramos usuario
    if (users.length) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario ya se registró con anterioridad",
      });
    }

    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(`${password}`, salt);

    const resp = await CreateUser({
      username,
      password: passwordEncrypted,
      type_id,
    });
    if (!resp)
      return res.status(500).json({
        msg: "Ocurrió un problema, intenta más tarde",
        ok: false,
        error: resp,
      });

    // Generamos el token
    const token = await generateToken(
      resp.id || 0,
      resp.username || "",
      resp.typeId || 0,
      resp.active || 0
    );
    // Retornamos la respuesta
    return res.json({
      ok: true,
      user: {
        name: resp.username,
        id: resp.id,
        type_id: resp.type_id,
        token,
        active: resp.active,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, hable con el administrador",
      error,
    });
  }
};

export const RenewToken = async (req: Request, res: Response) => {
  try {
    // Extraemos parametros del body
    const _token = req.header("token");
    // Validamos el token
    const { ok, id } = verifyJWT2(_token);
    // Renovamos el token si hay id
    if (!ok) throw "No se pudo generar el token";
    // Generamos el token y lo regresamos
    return res.json(await renewToken(id || 0));
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, hable con el administrador",
      error,
    });
  }
};
