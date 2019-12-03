import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';

import { HomeComponent } from './home/home.component';
import { MyTicketsComponent } from './tickets/my-tickets/my-tickets.component';
import { AllTicketsComponent } from './tickets/all-tickets/all-tickets.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { UserActivateComponent } from './users/user-activate/user-activate.component';
import { TicketListResolver } from './_resolvers/ticket-list.resolver';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketDetailResolver } from './_resolvers/ticket-detail.resolver';
import { ProductSpecificationListComponent }
    from './product-specifications/product-specification-list/product-specification-list.component';
import { ProductSpecificationListResolver } from './_resolvers/product-specification-list.resolver';
import { PersonListResolver } from './_resolvers/person-list.resolver';
import { PersonListComponent } from './persons/person-list/person-list.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonDetailResolver } from './_resolvers/person-detail.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'activate/:token', component: UserActivateComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'mytickets', component: MyTicketsComponent, resolve: { mytickets: TicketListResolver } },
            { path: 'tickets', component: AllTicketsComponent, resolve: { tickets: TicketListResolver } },
            { path: 'tickets/:id', component: TicketDetailComponent, resolve: { ticket: TicketDetailResolver } },
            { path: 'persons', component: PersonListComponent, resolve: { persons: PersonListResolver } },
            { path: 'persons/:id', component: PersonDetailComponent, resolve: { person: PersonDetailResolver } },
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AdminGuard],
        children: [
            { path: 'users', component: UserListComponent, resolve: { users: UserListResolver } },
            { path: 'users/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver } },
            { path: 'newuser', component: UserRegisterComponent },
            {
                path: 'productspecifications', component: ProductSpecificationListComponent,
                resolve: { productSpecifications: ProductSpecificationListResolver }
            },
        ]
    }
];