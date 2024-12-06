import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
import { Cart } from './cart.entity';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [TypeOrmModule.forFeature([Cart, Product, User]), ProductsModule],
  exports: [CartService],
})
export class CartModule {}
