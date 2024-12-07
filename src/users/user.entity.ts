import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Cart } from '../cart/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'customer' })
  role: string; // 'admin' or 'customer'

  // One-to-Many relationship: Seorang pengguna bisa memiliki banyak keranjang
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  // Relasi OneToMany ke Order (satu User bisa memiliki banyak Order)
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
