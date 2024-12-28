// src/modules/index.ts
import customerRouter from './routes/customerRouter';

export default (app: any) => {
  app.use(customerRouter);
};
