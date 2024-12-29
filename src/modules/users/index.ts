import customerRouter from "./routes/customerRouter";
import tenantsRouter from "./routes/tenantsRouter";

export default (app: any) => {
  app.use("/tenants", tenantsRouter);
  app.use("/customers", customerRouter);
};
