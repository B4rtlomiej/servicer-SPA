import { Item } from './item';
import { User } from './user';

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
    user: User;
}
