export class Product {
  constructor(
    public productId: number,
    public productName: string,
    public productDescription: string,
    public productImageUrl: string,
    public rating: number,
    public productPrice: number,
    public stock: number,
    public expectedDelivery: Date
  ) {}
}
