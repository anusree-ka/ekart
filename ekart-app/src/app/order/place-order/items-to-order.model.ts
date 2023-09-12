import { Product } from 'src/app/home/product.model';

export class ItemsToOrder {
  constructor(
    public itemId: number,
    public product: Product,
    public quantity: number,
    public cartId: number
  ) {}
}
