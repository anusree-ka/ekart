import { Product } from '../home/product.model';

export class Cart {
  constructor(
    public cartId: number,
    public product: Product,
    public userId: number,
    public quantity: number
  ) {}
}
