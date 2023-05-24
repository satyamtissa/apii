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
import { ReportsModule } from './reports/reports.module';
import { SearchProductsModule } from './search/search.module';
import { AddToCartModule } from './AddToCartApi/AddToCart.module';
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
    ReportsModule,
    SearchProductsModule,
    AddToCartModule,
    OrdersModule
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
