
import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../useCase"

export type CreateProductInputDTO = {
    name: string;
    price: number;
}

export type CreateProductOutputDTO= {
    id: string;
}


export class CreateProductUsecase implements Usecase<CreateProductInputDTO, CreateProductOutputDTO> {
    
    private constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new CreateProductUsecase(productGateway);
    }

    public async execute({name, price}: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
        const aProduct = Product.create(name, price);

        await this.productGateway.save(aProduct);

        const output = this.presentOutput (aProduct)

        return output;
    }

    private presentOutput(product: Product): CreateProductOutputDTO {
        const output: CreateProductOutputDTO = {
            id: product.id
        }
        return output
    }

}