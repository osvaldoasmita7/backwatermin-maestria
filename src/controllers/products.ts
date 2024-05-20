// Importamos dependencias
import { Request, Response } from "express";
import { getCompanies } from "../middlewares/companies.middleware";
import { getAllProducts } from "../middlewares/products.middleware";

/**
 * Función para traer todos los pedidos
 * @param req
 * @param res
 * @returns
 */
export const GetAllProducts = async (req: Request, res: Response) => {
  try {
    const filter = req.query;
    const products = await getAllProducts(filter);
    // Retornamos la respuesta
    return res.json({
      ok: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, hable con el administrador",
      error,
    });
  }
};
