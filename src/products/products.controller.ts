import { Controller, Get , Param, Post, Body, Put, Delete} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { Products } from './entities/products.entites.js';

@Controller('products')
export class ProductsController {

    constructor(
       private productsService: ProductsService
    ){}

    @Get('find-all')
    findAll(): Promise<Products[]> {
        return this.productsService.findAll();
    }

    @Get('find-by-id/:id')
    findById(@Param('id') id:string): Promise<Products> {
        return this.productsService.findById(id);
    }

    @Post('create')
    create(@Body() product: Products): Promise<Products | null> {
        return this.productsService.create(product);
    }

    @Put('update/:id')
    update(@Param('id') id: string, @Body() product: Products): Promise<Products | null> {
        return this.productsService.update(id, product);
    }
    
    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<Products | null> {
        return this.productsService.delete(id);
    }
}
