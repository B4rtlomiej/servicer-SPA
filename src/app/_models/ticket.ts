import { Item } from './item';

export interface Ticket {
    id: number;
    origin?: string;
    type?: string;
    status: string;
    priority: string;
    created: Date;
    closed?: Date;
    subject: string;
    description?: string;
    item: Item;
}
