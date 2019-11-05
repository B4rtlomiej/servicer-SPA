import { Customer } from './customer';
import { ProductSpecification } from './productSpecification';

export interface Item {
    manufacturer: string;
    productionYear: Date;
    productSpecification: ProductSpecification;
    customer: Customer;
}