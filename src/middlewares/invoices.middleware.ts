import { invoicesAttributes } from "../interfaces";
import { initModels } from "../models/db/init-models";
import { sequelizeConn } from "../connection/sequelizedb";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { invoices, companies, orders, products, status } =
  initModels(sequelizeConn);

export const createInvoice = async (invoice: invoicesAttributes) => {
  try {
    const resp = await invoices.create(invoice);
    if (!resp) throw new Error("No se pudo crear el pedido, intenta más tarde");
    return resp.dataValues;
  } catch (error) {
    throw error;
  }
};
export const updateInvoice = async (invoice: invoicesAttributes) => {
  try {
    const resp = await getInvoice(invoice?.id || 0);
    if (!resp) throw new Error("No se encontró el pedido");
    const respUpdate = await invoices.update(invoice, {
      where: { id: invoice.id },
    });
    return respUpdate;
  } catch (error) {
    throw error;
  }
};

export const getInvoices = async (invoice: invoicesAttributes) => {
  try {
    let where = {};
    if (invoice.city) where = { ...where, city: invoice.city };
    if (invoice.cologne) where = { ...where, cologne: invoice.cologne };
    if (invoice.createdBy) where = { ...where, createdBy: invoice.createdBy };
    if (invoice.date) where = { ...where, date: invoice.date };
    if (invoice.delegation)
      where = { ...where, delegation: invoice.delegation };
    if (invoice.exterior) where = { ...where, exterior: invoice.exterior };
    if (invoice.id) where = { ...where, id: invoice.id };
    if (invoice.idStatus) where = { ...where, idStatus: invoice.idStatus };
    if (invoice.interior) where = { ...where, interior: invoice.interior };
    if (invoice.name) where = { ...where, name: invoice.name };
    if (invoice.postalcode)
      where = { ...where, postalcode: invoice.postalcode };
    if (invoice.street) where = { ...where, street: invoice.street };
    if (invoice.time) where = { ...where, time: invoice.time };
    if (invoice.total) where = { ...where, total: invoice.total };
    if (invoice.created_by)
      where = { ...where, created_by: invoice.created_by };
    if (invoice.id_company)
      where = { ...where, id_company: invoice.id_company };

    return await invoices.findAll({
      where,
      include: [
        {
          model: status,
          as: "id_status_status",
          required: false,
        },
        {
          model: companies,
          as: "id_company_company",
          required: false,
        },
        {
          model: orders,
          as: "orders",
          required: false,
          include: [
            {
              model: products,
              as: "idProduct_product",
              required: false,
            },
          ],
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

export const getInvoice = async (id: number) => {
  try {
    const resp = await invoices.findOne({
      where: { id },
      include: [
        {
          model: orders,
          as: "orders",
          required: false,
        },
      ],
    });
    if (!resp) throw new Error("{status:400, msg:'No se encontró el pedido'}");
    return resp.dataValues;
  } catch (error) {
    throw error;
  }
};
