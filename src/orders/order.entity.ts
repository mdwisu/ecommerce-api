// order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity'; // Relasi ke User
import { Product } from '../products/product.entity'; // Relasi ke Product

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  orderDate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number; // Total harga order

  @Column({ default: 'pending' })
  status: string; // Status pesanan (pending, shipped, delivered, etc.)

  // Relasi ManyToOne ke User (satu Order milik satu User)
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // Relasi ManyToMany dengan Product (satu Order bisa berisi banyak Product)
  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable() // Tabel penghubung untuk relasi ManyToMany
  products: Product[];
}
