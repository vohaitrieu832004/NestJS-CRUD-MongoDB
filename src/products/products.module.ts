import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './entities/products.entites.js';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductsSchema }])
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
