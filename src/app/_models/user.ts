import { Person } from './person';

export interface User {
    id: number;
    username: string;
    lastActive: Date;
    userRole: string;
    person: Person;
    isActive: boolean;
}