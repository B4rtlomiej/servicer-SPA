import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'mytickets', component: MyTicketsComponent },
            { path: 'tickets', component: AllTicketsComponent },
            { path: 'newticket', component: NewTicketComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
