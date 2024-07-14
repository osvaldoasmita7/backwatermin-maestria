import {
  companiesAttributes,
  invoicesAttributes,
  ordersAttributes,
} from "../interfaces";
import { initModels } from "../models/db/init-models";
import { sequelizeConn } from "../connection/sequelizedb";
const { invoices, companies, orders, products, status } =
  initModels(sequelizeConn);

export const createInvoice = async (
  invoice: invoicesAttributes,
  _orders: ordersAttributes[] = []
) => {
  try {
    invoice.id_status = 1;
    invoice.date = new Date().toDateString();
    invoice.time = new Date().toTimeString();
    let notRedeemed = 0;
    // let { notRedeemed, orders } = await getOrdersNotRemeeded(
    //   invoice.created_by || 0
    // );
    for (const item of _orders) {
      invoice.total = (invoice.total || 0) + item.quantity * (item.price || 1);
      notRedeemed = notRedeemed + item.quantity;
    }
    let toDisccount = Math.floor(notRedeemed / 9);
    let remeeded = 0;
    for (const item of _orders) {
      if (toDisccount > 0 && toDisccount)
        if (toDisccount <= item.quantity) {
          invoice.total =
            (invoice.total || 0) - toDisccount * (item.price || 1);
          toDisccount = 0;
          remeeded = remeeded + toDisccount;
        } else {
          invoice.total =
            (invoice.total || 0) - item.quantity * (item.price || 1);
          toDisccount = toDisccount - item.quantity;
          remeeded = remeeded + item.quantity;
        }
    }

    const resp = await invoices.create(invoice);
    if (!resp) throw new Error("No se pudo crear el pedido, intenta más tarde");
    console.log("ordenes a guardar", _orders);
    const respOrders = await createOrders(_orders, resp.id);
    resp.dataValues.orders = respOrders;

    // Actualizamos todas las ordenes que quedan restantes
    // await getAllOrdersAndUpdateWithParam(remeeded, invoice.created_by || 0);
    return resp.dataValues;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
export const getAllOrdersAndUpdateWithParam = async (
  remeeded: number,
  userId: number
) => {
  const { orders: orderList } = await getOrdersNotRemeeded(userId);
  for (const item of orderList) {
    if (remeeded > 0)
      if (item.quantity <= remeeded) {
        // Actualizamos solo la cantidad
        item.quantity_disccount = item.quantity;
        item.redeemed = 1;
        remeeded = remeeded - item.quantity;
      } else {
        // Actualizamos los restantes
        item.quantity_disccount = remeeded;
        remeeded = 0;
      }

    await orders.update(item, {
      where: {
        idOrder: item.idOrder,
      },
    });
  }
  return orderList;
};
export const createOrders = async (
  _orders: ordersAttributes[],
  idInvoice: number
) => {
  for (const item of _orders) {
    item.id_invoice = idInvoice;
  }
  return await orders.bulkCreate(_orders);
};
// Traemos las ordenes de esa persona que no hayan
export const getOrdersNotRemeeded = async (userId: number) => {
  try {
    if (!userId)
      throw { status: 400, message: "El id del usuario no puede ser 0" };
    let notRedeemed = 0;
    const _invoices: invoicesAttributes[] = await invoices.findAll({
      where: {
        created_by: userId,
      },
    });

    const _orders = [];
    for (const item of _invoices) {
      const resp: ordersAttributes[] = await orders.findAll({
        where: { redeemed: false, id_invoice: item.id },
      });
      if (resp.length) _orders.push(...resp);
    }

    for (const _order of _orders) {
      notRedeemed = notRedeemed + _order.quantity;
    }
    return {
      notRedeemed,
      orders: _orders,
      invoices: _invoices,
    };
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
    if (!resp)
      throw new Error("{status:400, message:'No se encontró el pedido'}");
    return resp.dataValues;
  } catch (error) {
    throw error;
  }
};
export const getLastInvoice = async (invoice: invoicesAttributes) => {
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
    const resp = await invoices.findOne({
      where,
      include: [
        {
          model: orders,
          as: "orders",
          required: false,
        },
      ],
      order: [["id", "desc"]],
    });
    if (!resp) throw { status: 404, message: "No se encontró el pedido" };
    return resp.dataValues;
  } catch (error) {
    throw error;
  }
};

export const getCompaniesRegistered = async (userId: string) => {
  const _invoices = await invoices.findAll({ where: { created_by: userId } });
  const _companies: companiesAttributes[] = [];
  for (const item of _invoices) {
    const resp: companiesAttributes = (await companies.findOne({
      where: { id: item.id_company },
    })) as companiesAttributes;
    if (resp && !_companies.find((x) => x.id === resp.id))
      _companies.push({ id: resp.id, name: resp.name });
  }
  return _companies;
};
