import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      price: number;
      description: string;
      category: string;
    },
  ) {
    return this.productsService.createProduct(
      body.name,
      body.price,
      body.description,
      body.category,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Body() body: { id: number }) {
    return this.productsService.findOne(body.id);
  }
}
