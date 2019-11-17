import { Customer } from './customer';
import { ProductSpecification } from './productSpecification';

export interface Item {
    id: number;
    manufacturer: string;
    productionYear: Date;
    productSpecification: ProductSpecification;
    customer: Customer;
}