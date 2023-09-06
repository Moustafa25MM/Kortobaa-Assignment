import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../util/database';

interface ProductAttributes {
  id: number;
  title: string;
  image: string;
  price: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public title!: string;
  public image!: string;
  public price!: number;
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
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

export default Product;
