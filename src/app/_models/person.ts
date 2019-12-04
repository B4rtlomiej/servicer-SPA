import { Note } from './note';

export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    sex?: string;
    personNotes: Note[];
}