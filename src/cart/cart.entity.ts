// cart.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string; // Misalnya: 'active', 'completed'

  @Column({ default: 0 })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Product, (product) => product.carts)
  @JoinTable()
  products: Product[];

  @OneToMany(() => Order, (order) => order.cart)
  orders: Order[];
}
