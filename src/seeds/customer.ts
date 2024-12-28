import sequelize from '../shared/database'
import Customer from '../modules/customers/models/customer';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');

    // Seed customers
    const customers = await Customer.bulkCreate([
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Emily Johnson', email: 'emily@example.com' },
    ]);
    console.log('Customer seeded:', customers.map(author => author.toJSON()));
} catch (error) {
    console.error('Error syncing database:', error);
  }
}

seedDatabase()
