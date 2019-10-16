import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';

import { HomeComponent } from './home/home.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserRegisterComponent } from './users/user-register/user-register.component';

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
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AdminGuard],
        children: [
            { path: 'users', component: UserListComponent, resolve: { users: UserListResolver } },
            { path: 'users/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver } },
            { path: 'newuser', component: UserRegisterComponent }
        ]
    }
];
