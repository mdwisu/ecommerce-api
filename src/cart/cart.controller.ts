import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
  ) {}
}
