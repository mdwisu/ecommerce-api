// cart.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

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
}
