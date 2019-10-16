import { Person } from './person';

export interface User {
    id: number;
    username: string;
    lastActive: Date;
    userRole: string;
    person: Person;
    // firstName: string;
    // lastName: string;
    // add optionals with ? for detail; like interests?: string; photos?: Photo[];
}
