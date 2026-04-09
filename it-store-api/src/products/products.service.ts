import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ) { }

    // Read: Get every products
    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const result = await this.productsRepository.findOneBy({ id });

        // Check if said product was found
        if (!result) {
            throw new NotFoundException('Can not find product with said ID.');
        }

        return result;
    }

    async create(product: Product): Promise<Product> {
        // Create and save the product
        return this.productsRepository.save(product);
    }

    // The 'save' method (more efficient)
    async update(id: number, productChanges: Partial<Product>): Promise<Product> {

        // 1. FIND
        const existingProduct = await this.productsRepository.findOneBy({ id });
        if (!existingProduct) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }

        // This part is just in-memory, no database call
        this.productsRepository.merge(existingProduct, productChanges);

        // 2. SAVE (This updates and returns the new entity in one go)
        return this.productsRepository.save(existingProduct);
    }

    async remove(id: number): Promise<void> {
        
        
        // Try to delete the product
        const deleteResult = await this.productsRepository.delete(id)

        // Check if it was delete
        if (deleteResult.affected === 0){
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }
    }

}