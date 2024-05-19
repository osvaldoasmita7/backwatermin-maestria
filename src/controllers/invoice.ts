// Importamos dependencias
import { Request, Response } from "express";
import {
  createInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "../middlewares/invoices.middleware";
// Importamos middlewares
// Importamos interfaces
// Importamos helpers

/**
 * Función para traer todos los pedidos
 * @param req
 * @param res
 * @returns
 */
export const GetAllInvoice = async (req: Request, res: Response) => {
  try {
    const filter = req.query;
    const invoices = await getInvoices(filter);
    // Retornamos la respuesta
    return res.json({
      ok: true,
      invoices,
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
 * Función para traer un pedido
 * @param req
 * @param res
 * @returns
 */
export const GetInvoice = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const invoice = await getInvoice(+id);
    // Retornamos la respuesta
    return res.json({
      ok: true,
      ...invoice,
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
 * Función para crear un pedido
 * @param req
 * @param res
 * @returns
 */
export const CreateInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = req.body;
    const resp = await createInvoice(invoice);
    // Retornamos la respuesta
    return res.json({
      ok: true,
      ...resp,
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
 * Función para actualizar un pedido
 * @param req
 * @param res
 * @returns
 */
export const UpdateInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = req.body;
    const resp = await updateInvoice(invoice);
    // Retornamos la respuesta
    return res.json({
      ok: true,
      ...resp,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, hable con el administrador",
      error,
    });
  }
};
