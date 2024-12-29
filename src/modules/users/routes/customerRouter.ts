import { Router } from "express";
import Customer from "../models/customer";
import Usage from "../../billing/models/usage";
import { Sequelize, Op } from "sequelize"; // Import Op from sequelize

const customerRouter = Router();

customerRouter.get("/:id/usage", async (req, res, next) => {
  // authenticate the user first and get the tenantId from the token
  try {
    const { id: customerId } = req.params;
    const { startDate, endDate } = req.query;
    const usages = await Usage.findAll({
      where: {
        customerId,
        consumedAt: {
          [Op.between]:
            startDate && endDate
              ? [new Date(startDate), new Date(endDate)]
              : [new Date("2021-01-01"), new Date()],
        },
      },
    });

    res.status(200).json(usages);
  } catch (error) {
    next(error);
  }
});

export default customerRouter;
