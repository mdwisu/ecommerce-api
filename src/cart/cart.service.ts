import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entity
import { Product } from '../products/product.entity';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCart(userId: number, status: string): Promise<Cart> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const cart = new Cart();
    cart.status = status;
    cart.user = user;
    return this.cartRepository.save(cart);
  }

  async addProductToCart(cartId: number, productId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['products'],
    });
    cart.products.push(
      await this.productRepository.findOne({ where: { id: productId } }),
    );
    return this.cartRepository.save(cart);
  }

  async getCartByUserId(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['products'],
    });
  }

  async updateCartStatus(cartId: number, status: string): Promise<Cart> {
    await this.cartRepository.update({ id: cartId }, { status: status });
    return this.cartRepository.findOne({ where: { id: cartId } });
  }
}
