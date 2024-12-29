import usageRouter from "./routes/usageRouter";

export default (app: any) => {
  app.use("/usage", usageRouter);
};
