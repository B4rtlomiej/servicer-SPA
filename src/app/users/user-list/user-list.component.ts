import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminModeService } from 'src/app/_services/admin-mode.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'src/app/_services/toastr.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  wasActive: string;
  constructor(private router: ActivatedRoute, private userService: UserService,
    private toastr: ToastrService, private adminMode: AdminModeService) { }

  ngOnInit() {
    this.adminMode.isAdminMode = true;
    this.router.data.subscribe(data => {
      this.users = data.users;
    });
  }

  resetPassword(id: number) {
    this.userService.resetPassword(id).subscribe(() => {
      this.toastr.success('Zresetowano hasło.');
    }, error => {
      this.toastr.error(error);
    });
  }
  changeIsActive(id: number, isActive: boolean) {
    this.wasActive = isActive ? 'Dezaktywowano' : 'Aktywowano';
    this.userService.changeIsActive(id, isActive).subscribe(
      () => {
        this.toastr.success(this.wasActive + ' użytkownika.');
      },
      error => {
        this.toastr.error(error);
      }
    );
  }
}
