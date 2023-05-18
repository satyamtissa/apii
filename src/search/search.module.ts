import { Module } from '@nestjs/common';
import { SearchProductsService } from './search.service';
import { SearchProductsController } from './search.controller';

import { MongoModule } from '../common/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [SearchProductsController],
  providers: [SearchProductsService],
})
export class SearchProductsModule {}
