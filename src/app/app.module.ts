import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { appRoutes } from './routes';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { AdminMainComponent } from './admin-main/admin-main.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MyTicketsComponent,
      AllTicketsComponent,
      NewTicketComponent,
      NavAdminComponent,
      AdminMainComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
