import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CartService } from '../cart/cart.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly cartService: CartService,
  ) {}

  @Post('create')
  createOrder(@Body() body: { userId: number }) {
    return this.ordersService.createOrder({ id: body.userId });
  }
}
