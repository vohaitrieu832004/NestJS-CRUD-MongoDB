import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './entities/products.entites.js';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products.name)
        private productsModel: Model<Products>
    ) {}

    findAll(): Promise<Products[]> {
        return this.productsModel.find().exec();
    }

    async findById(id: string): Promise<Products> {
        const product = await this.productsModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    create(product: Products): Promise<Products | null> {
        return this.productsModel.create(product);
    }

    update(id: string, product: Products): Promise<Products | null> {
        return this.productsModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    delete(id: string): Promise<Products | null> {
        return this.productsModel.findByIdAndDelete(id).exec();
    }
}
