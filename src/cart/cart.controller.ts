import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('add')
  async addToCart(@Body() body: { productId: number; quantity: number }) {
    const product = await this.productsService.findOne(body.productId);
    this.cartService.addToCart(product, body.quantity);
    return { message: 'Product added to cart' };
  }

  @Get()
  getCart() {
    return this.cartService.getCart();
  }
}
