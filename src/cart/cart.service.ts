import { Injectable } from '@nestjs/common';
import { Product } from '../products/product.entity';

@Injectable()
export class CartService {
  private cart: { product: Product; quantity: number }[] = [];

  addToCart(product: Product, quantity: number) {
    this.cart.push({ product, quantity });
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    return this.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }
}
