// Importamos dependencias
import { Request, Response } from "express";
import { SearchPostalCode } from "../middlewares/postal_codes.middleware";

/**
 * Función para traer todos los pedidos
 * @param req
 * @param res
 * @returns
 */
export const searchPostalCodes = async (req: Request, res: Response) => {
  try {
    const postalCode = req.query.postalCode || req.query["postal-code"] || "";
    if (!postalCode)
      return res
        .status(400)
        .json({ ok: false, message: "No se envió el código postal" });
    const cps = await SearchPostalCode(`${postalCode}`);
    // Retornamos la respuesta
    return res.json({
      ok: true,
      cps,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, hable con el administrador",
      error,
    });
  }
};
