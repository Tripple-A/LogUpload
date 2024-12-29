// src/modules/users/services/userService.ts
import eventSystem from "../../../shared/eventSystem";
import Usage from "../models/usage";

class BulkCreateUsageService {
  async createUsage(data: object[]) {
    for (const row of data) {
      await Usage.create({
        customerId: 1,
        product: row.product,
        service: row.service,
        consumedAt: new Date(row.createdAt),
        cost: row["cost(k)"], // Convert to full cost
        status: row.status,
        status_code: parseInt(row.status_code),
        raw_status: row.raw_status,
        mode: row.mode,
        app: row.app,
        transactionId: row.id,
      });
    }
  }
}

export default new BulkCreateUsageService();
