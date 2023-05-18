import { Module } from '@nestjs/common';


import { AddToCartService } from './AddToCart.service';
import { AddToCartController } from './AddToCart.controller';

import { MongoModule } from '../common/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [AddToCartController],
  providers: [AddToCartService],
})
export class AddToCartModule {}
