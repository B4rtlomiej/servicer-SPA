import { Person } from './person';

export interface Customer {
    id: number;
    supportLevel: string;
    person: Person;
}