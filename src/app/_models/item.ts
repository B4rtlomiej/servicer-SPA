import { Customer } from './customer';
import { ProductSpecification } from './productSpecification';

export interface Item {
    name: string;
    manufacturer: string;
    productionYear: Date;
    productSpecification: ProductSpecification;
    customer: Customer;
}