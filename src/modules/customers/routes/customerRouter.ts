import express from "express";
import Customer from "../models/customer";
import { Sequelize } from "sequelize";

const customerRouter = express.Router();

customerRouter.get("/customers", async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

export default customerRouter;