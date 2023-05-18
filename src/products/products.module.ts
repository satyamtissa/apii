import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { MongoModule } from '../common/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
