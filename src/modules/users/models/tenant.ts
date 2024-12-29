import { DataTypes, HasMany, Model } from "sequelize";
import sequelize from "../../../shared/database";
import Customer from "./customer";
import Usage from "../../billing/models/usage";

class Tenant extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public email!: string;
}

Tenant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tenant",
    tableName: "Tenants",
    timestamps: true,
  }
);

// One-to-Many: Tenant → Customer
Tenant.hasMany(Customer, {
  foreignKey: "tenantId",
  as: "customers",
  onDelete: "CASCADE",
});

Customer.belongsTo(Tenant, {
  foreignKey: "tenantId",
  as: "tenant",
});

Customer.hasMany(Usage, {
  foreignKey: "customerId",
  as: "usages",
  onDelete: "CASCADE",
});

export default Tenant;
