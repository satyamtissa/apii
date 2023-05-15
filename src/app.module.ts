import { Module } from '@nestjs/common'; 
import { CommonModule } from './common/common.module'; 
import { CategoriesModule } from './categories/categories.module'; 
import { MongooseModule } from '@nestjs/mongoose'; 
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/skpearl', {
      connectionName: 'skpearl',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
   
    CommonModule, 
    CategoriesModule,
    AuthModule,
    UsersModule,
    AddressesModule,
    ProductsModule,
    OrdersModule,
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
