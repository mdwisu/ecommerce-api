import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    UsersModule,
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Menentukan tipe database
      host: 'localhost', // Host PostgreSQL
      port: 5432, // Port default PostgreSQL
      username: 'postgres', // Username untuk koneksi ke DB
      password: 'postgredwi', // Password untuk koneksi ke DB
      database: 'db_ecommerce_nest', // Nama database yang ingin digunakan
      entities: [
        // Daftar entitas yang digunakan di aplikasi
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      synchronize: true, // Auto sync DB schema (hanya di dev)
    }),
    ProductsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
