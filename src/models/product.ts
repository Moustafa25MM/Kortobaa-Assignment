import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../util/database';
import User from './user';

interface ProductAttributes {
  id: number;
  title: string;
  image: string;
  price: number;
  userId: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public title!: string;
  public image!: string;
  public price!: number;
  public userId!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

Product.belongsTo(User, { foreignKey: 'userId' });

export default Product;
