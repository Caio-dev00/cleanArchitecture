import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/product/entity/product";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";

export class ProductRepositoryPrisma implements ProductGateway {

    private constructor(private readonly prismaCLient: PrismaClient){}

    public static create(prismaCLient: PrismaClient){
        return new ProductRepositoryPrisma(prismaCLient);
    }

    public async save(product: Product): Promise<void> {
       const data = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
       };

       await this.prismaCLient.product.create({
        data,
       })
    }
    public async list(): Promise<Product[]> {
        const products = await this.prismaCLient.product.findMany();

        const productList = products.map((p) => {
            const product = Product.with({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: p.quantity,
            });
            return product;
        });
        return productList;
    }

}