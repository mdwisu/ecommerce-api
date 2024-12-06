import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Menentukan tipe database
      host: 'localhost', // Host PostgreSQL
      port: 5432, // Port default PostgreSQL
      username: 'postgres', // Username untuk koneksi ke DB
      password: 'postgredwi', // Password untuk koneksi ke DB
      database: 'db_ecommerce_nest', // Nama database yang ingin digunakan
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Auto sync DB schema (hanya di dev)
    }),
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // Menghapus properti yang tidak ada di DTO
      }),
    },
  ],
})
export class AppModule {}
