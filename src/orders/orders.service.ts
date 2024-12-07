import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly cartService: CartService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(userId: number, productId: number[], orderDate: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const products = await this.productRepository.findBy({ id: In(productId) });
    const cart = await this.cartService.getCartByUserId(userId);
    if (!cart || cart.length === 0) {
      throw new NotFoundException('Cart not found for the user');
    }
    const totalAmount = products.reduce(
      (acc, product) => acc + parseFloat(product.price.toString()),
      0,
    );
    const order = new Order();
    order.user = user;
    order.products = products;
    order.orderDate = orderDate;
    order.totalAmount = totalAmount;
    order.cart = cart[0]; // mengaitkan cart yang relevan
    return this.orderRepository.save(order);
  }

  async getOrderByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['products'],
    });
  }
}
