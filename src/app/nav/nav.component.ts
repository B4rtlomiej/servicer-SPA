import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from '../_services/toastr.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() adminMode = new EventEmitter();
  model: any = {};

  constructor(public authService: AuthService, private toastr: ToastrService, private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  login() {
    this.spinner.show();
    this.authService.login(this.model).subscribe(next => {
      this.spinner.hide();
      this.toastr.success('Pomyślnie zalogowano.');
      this.router.navigate(['/tickets']);
    }, error => {
      this.spinner.hide();
      this.toastr.error('Błędny login, lub hasło.');
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.info('Wylogowano.');
    this.router.navigate(['/']);
  }

  setAdminMode() {
    this.router.navigate(['/users']);
    this.adminMode.emit(true);
  }

}
