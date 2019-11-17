import { Item } from './item';
import { Note } from './note';

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
    ticketNotes: Note[];
    customerNotes: Note[];
    itemNotes: Note[];
    productSpecificationNotes: Note[];

}
