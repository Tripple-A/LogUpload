import { Router } from 'express';
import Customer from "../models/customer";
import Tenant from "../models/tenant";

const tenantsRouter = Router();

tenantsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findByPk(id, {
      include: [
      { model: Customer, as: "customers" },
      ],
    });

    if (!tenant) {
      res.status(404).json({ message: "Tenant not found" });
      return;
    }
    res.status(200).json({tenant});
  } catch (error) {
    next(error);
  }
});


tenantsRouter.get("/:id/customers", async (req, res, next) => {
  try {
    const { id: tenantId } = req.params;
    const customers = await Customer.findAll({
      where: {
        tenantId,
    }});
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

tenantsRouter.get("/:id/customers/:customerId", async (req, res, next) => {
  try {
    const { id: tenantId, customerId } = req.params;
    const customers = await Customer.findAll({
      where: {
        tenantId, id: customerId,
    }, include: [{model: Tenant, as: "tenant"}]});
    res.status(200).json(customers[0]);
  } catch (error) {
    next(error);
  }
});

export default tenantsRouter;
