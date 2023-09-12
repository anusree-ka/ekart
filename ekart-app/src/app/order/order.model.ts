import { Product } from '../home/product.model';

export class Order {
  constructor(
    public orderId: number,
    public product: Product,
    public userId: number,
    public quantity: number,
    public orderAmount: number,
    public paymentMode: string,
    public deliveryStatus: string,
    public orderDate: Date,
    public deliveredDate: Date
  ) {}
}
