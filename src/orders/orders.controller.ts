import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CartService } from '../cart/cart.service';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly cartService: CartService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() body: { userId: number }) {
    // return this.ordersService.createOrder({ id: body.userId });
    return 'hallo';
  }
}
