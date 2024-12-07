import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CartService } from '../cart/cart.service';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly cartService: CartService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  createOrder(@Request() req: any, @Body() body: any) {
    const { productIds, orderDate } = body;
    return this.ordersService.createOrder(req.user.id, productIds, orderDate);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getOrdersByUser(@Request() req: any) {
    return this.ordersService.getOrderByUserId(req.user.id);
  }
}
