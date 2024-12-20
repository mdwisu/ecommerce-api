import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

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
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Body() body: { id: number }) {
    return this.productsService.findOne(body.id);
  }
}
