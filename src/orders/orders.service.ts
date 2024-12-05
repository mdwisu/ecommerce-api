import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly cartService: CartService) {}

  createOrder(user: User) {
    const total = this.cartService.getTotal();
    // Simpan order ke database atau state
    return { message: 'Order created', total };
  }
}
