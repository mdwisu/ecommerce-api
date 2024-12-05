import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CartService } from '../cart/cart.service';

@Module({
  imports: [CartService],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
