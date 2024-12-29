import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/database";

class Usage extends Model {
  public id!: number;
  public product!: string;
  public service!: string;
  public consumedAt!: Date;
  public cost!: number;
  public status!: string;
  public status_code!: number;
  public raw_status!: string;
  public mode!: string;
  public app!: string;
  public transactionId!: string;
}

Usage.init(
  {
    product: DataTypes.STRING,
    service: DataTypes.STRING,
    consumedAt: DataTypes.DATE,
    cost: DataTypes.FLOAT,
    status: DataTypes.STRING,
    status_code: DataTypes.INTEGER,
    raw_status: DataTypes.STRING,
    mode: DataTypes.STRING,
    app: DataTypes.STRING,
    transactionId: DataTypes.STRING, // Renamed 'id' to avoid conflicts with Sequelize ID
  },
  {
    sequelize,
    modelName: "Usage",
    tableName: "usages",
    timestamps: true,
  }
);

export default Usage;
