import sequelize from '../shared/database'
import Customer from '../modules/users/models/customer';
import Tenant from '../modules/users/models/tenant';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');

    // Seed tenants
    const tenants = await Tenant.bulkCreate([
      { name: 'Avalanche Electric', email: 'usara@avalanche.com', address: '123 Main St, Denver, CO 80202' },
      { name: 'Bolt Electric', email: 'bolt@uber.com', address: '456 Main St, Denver, CO 80202' },
    ]);

    console.log('Tenants seeded:', tenants.map(tenant => tenant.toJSON()));

    // Seed customers
    const customers = await Customer.bulkCreate([
      { name: 'John Doe', email: 'john@example.com', tenantId: tenants[0].id },
      { name: 'Jane Smith', email: 'jane@example.com', tenantId: tenants[0].id },
      { name: 'Emily Johnson', email: 'emily@example.com', tenantId: tenants[1].id },
    ]);
    console.log('Customers seeded:', customers.map(customer => customer.toJSON()));
} catch (error) {
    console.error('Error syncing database:', error);
  }
}

seedDatabase()
