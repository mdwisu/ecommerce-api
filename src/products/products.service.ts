import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  createProduct(
    name: string,
    price: number,
    description: string,
    category: string,
  ): Promise<Product> {
    const newProduct = this.productsRepository.create({
      name,
      price,
      description,
      category,
    });
    return this.productsRepository.save(newProduct);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }
}
