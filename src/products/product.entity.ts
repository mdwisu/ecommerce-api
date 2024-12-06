import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Cart } from '../cart/cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  // Relasi ManyToMany dengan Cart (produk bisa ada dalam banyak cart)
  @ManyToMany(() => Cart, (cart) => cart.products)
  carts: Cart[];

  // Relasi ManyToMany dengan Product (satu Order bisa berisi banyak Product)
  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
