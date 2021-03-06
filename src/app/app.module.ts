import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MyTicketsComponent } from './tickets/my-tickets/my-tickets.component';
import { AllTicketsComponent } from './tickets/all-tickets/all-tickets.component';
import { appRoutes } from './routes';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { UserActivateComponent } from './users/user-activate/user-activate.component';
import { TicketListResolver } from './_resolvers/ticket-list.resolver';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketDetailResolver } from './_resolvers/ticket-detail.resolver';
import { ReportsResolver } from './_resolvers/reports.resolver';
import { ProductSpecificationListComponent }
   from './product-specifications/product-specification-list/product-specification-list.component';
import { ProductSpecificationListResolver } from './_resolvers/product-specification-list.resolver';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChartsModule } from 'ng2-charts';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { ReportsComponent } from './reports/reports/reports.component';
import { PersonListResolver } from './_resolvers/person-list.resolver';
import { PersonListComponent } from './persons/person-list/person-list.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonDetailResolver } from './_resolvers/person-detail.resolver';

export function tokenRetriver() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MyTicketsComponent,
      AllTicketsComponent,
      TicketDetailComponent,
      NavAdminComponent,
      UserListComponent,
      UserDetailComponent,
      UserRegisterComponent,
      UserActivateComponent,
      ProductSpecificationListComponent,
      ReportsComponent,
      PersonListComponent,
      PersonDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenRetriver,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      ModalModule.forRoot(),
      NgxSpinnerModule,
      AccordionModule.forRoot(),
      BrowserAnimationsModule,
      ChartsModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      UserDetailResolver,
      UserListResolver,
      TicketDetailResolver,
      TicketListResolver,
      ProductSpecificationListResolver,
      ReportsResolver,
      PersonListResolver,
      PersonDetailResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }