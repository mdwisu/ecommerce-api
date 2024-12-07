import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';
import { JwtAuthGuard } from '../guards/auth.guard';
import { Cart } from './cart.entity';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createCart(
    @Request() req: any,
    @Body('status') status: string,
  ): Promise<Cart> {
    return this.cartService.createCart(req.user.id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-product')
  async addProductToCart(
    @Request() req: any,
    @Body('cartId') cartId: number,
    @Body('productId') productId: number,
  ): Promise<Cart> {
    return this.cartService.addProductToCart(cartId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('get-cart')
  async getCartByUser(@Request() req: any): Promise<Cart[]> {
    return this.cartService.getCartByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-status')
  async updateCartStatus(
    @Request() req: any,
    @Body('cartId') cartId: number,
    @Body('status') status: string,
  ) {
    return this.cartService.updateCartStatus(cartId, status);
  }
}
