import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

// Prefix
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    // Read, call find all function from productsService
    @Get()
    findAll(): Promise<Product[]>{
        return this.productsService.findAll();
    }
    
    // Read, single record
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Product>{
        return this.productsService.findOne(parseInt(id));
    }

    // Create
    @Post()
    create(@Body() product: Product): Promise<Product>{
        return this.productsService.create(product);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() productChanges: Partial<Product>): Promise<Product>{
        return this.productsService.update(parseInt(id), productChanges);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void>{
        return this.productsService.remove(parseInt(id));
    }
}
