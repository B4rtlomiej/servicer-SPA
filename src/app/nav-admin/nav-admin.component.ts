import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from '../_services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {

  @Output() adminMode = new EventEmitter();
  model: any = {};

  constructor(public authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.info('Wylogowano.');
    this.router.navigate(['/home']);
  }

  setAdminMode() {
    this.adminMode.emit(false);
  }
}
